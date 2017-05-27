import angular from 'angular';

const app = angular.module('app.services', []);
app.factory('ChannelService', function ($http) {

  const API = {
    getChannels
  };

  return API;

  function getChannels() {
    return $http.get('/data/channels.json').then(res => res.data);
  }
});
