'use strict';

/**
 * @ngdoc function
 * @name mozioApp.controller:MapsQueryController
 * @description
 * # MapsQueryController
 * Controller of the mozioApp
 */
var mozioApp = angular.module('mozioApp');

mozioApp.controller('MapsQueryController', [
  '$scope',
  'uiGmapGoogleMapApi',
  function ($scope, uiGmapGoogleMapApi) {
    uiGmapGoogleMapApi.then(function(maps){
    });
}]);
