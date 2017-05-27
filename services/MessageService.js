import angular from 'angular';

const app = angular.module('app.services');
app.factory('MessageService', function ($http, $q) {

  let messages;

  const API = {
    getMessagesForChannelId
  };

  return API;

  function getMessagesForChannelId(id) {

    if(messages && messages[id]){
      return $q.resolve(messages[id]);
    }

    return $http.get('/data/channel-data.json').then(res => {
      messages = res.data;

      if(messages[id]){
        return messages[id];
      } else {
        return [];
      }
    });
  }
});
