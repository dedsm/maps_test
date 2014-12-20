'use strict';

/**
 * @ngdoc function
 * @name mozioApp.controller:MapsDrawController
 * @description
 * # MapsDrawController
 * Controller of the mozioApp
 */
var mozioApp = angular.module('mozioApp');

mozioApp.controller('MapsDrawController', [
  '$scope',
  'uiGmapGoogleMapApi',
  function ($scope, uiGmapGoogleMapApi) {
    uiGmapGoogleMapApi.then(function(maps){
    });
}]);
