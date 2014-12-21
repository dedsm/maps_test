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
  'Area',
  function ($scope, uiGmapGoogleMapApi, Area) {
    uiGmapGoogleMapApi.then(function(maps){
      $scope.map = {
        center: {
          latitude: 53.406754,
          longitude: -2.158843
        },
        pan: true,
        zoom: 14,
        options: {
        },
        events: {},
        bounds: {},
        polys: [],
        draw: undefined
      };


      $scope.serviceEventHandler = {
        'click': function(googlePoly, eventName, ngModel, args){
          if (args[0]._alreadyCalled){
            return
          }
          args[0]._alreadyCalled = true;
          google.maps.event.trigger(googlePoly.map, 'click', args[0]);
          $scope.handlingClick = false;
        }
      };

      $scope.mapsEventHandler = {
        'click': function(maps, eventName, args){
          var latLng = args[0].latLng;

          $scope.areas = Area.$search({'lat': latLng.lat(), 'long': latLng.lng()});
        }
      };
    });
}]);
