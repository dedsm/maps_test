'use strict';

var mozioApp = angular.module('mozioApp');

mozioApp.factory('Area', [
  'restmod',
  function(restmod){
  return restmod.model('areas/');
}]);
