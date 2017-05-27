import angular from 'angular';

const app = angular.module('app.services');

app.factory('UserService', function ($http, $q) {

  const API = {
    getUsers,
    getUserById
  };

  let users;
  let currentPromise;

  return API;

  function getUsers() {
    if (users && users['0']) {
      return $q.resolve(users);
    }

    if (!currentPromise) {
      currentPromise = $http.get('/data/users.json').then(res => {
        currentPromise = undefined;

        users = {};
        res.data.forEach((val, index) => {
          val.id = index;
          users[val.id] = val;
        });
        return users;
      });
    }
    return currentPromise;
  }

  function getUserById(id) {
    return getUsers().then(users => users[id]);
  }

});
