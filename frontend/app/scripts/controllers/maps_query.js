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
  'MessageUtils',
  function ($scope, uiGmapGoogleMapApi, Area, Message) {
    uiGmapGoogleMapApi.then(function(maps){
    });
      $scope.map = {
        center: {
          latitude: 53.406754,
          longitude: -2.158843
        },
        control: {},
        pan: true,
        zoom: 14,
        options: {
        },
        events: {},
        bounds: {},
        polys: [],
        draw: undefined
      };

      $scope.searchbox = {
        events: {
          places_changed: function (searchBox) {
            // Center the map in the location if it's valid, DRY, I know
            var places = searchBox.getPlaces()
            if (places.length == 0) {
              return;
            }
            var bounds = new google.maps.LatLngBounds();
            for (var i = 0, place; place = places[i]; i++) {
              bounds.extend(place.geometry.location);
            }

            $scope.map.bounds = {
              northeast: {
                latitude: bounds.getNorthEast().lat(),
                longitude: bounds.getNorthEast().lng()
              },
              southwest: {
                latitude: bounds.getSouthWest().lat(),
                longitude: bounds.getSouthWest().lng()
              }
            }

            $scope.map.zoom = 12;
          }
        }
      };

      $scope.serviceEventHandler = {
        /*
         * If the user clicks on a polygon, we need to propagate it to the map
         */
        'click': function(googlePoly, eventName, ngModel, args){
          if (args[0]._alreadyCalled){
            // Don't ask me why, but google sends the event twice
            return
          }
          args[0]._alreadyCalled = true;
          google.maps.event.trigger(googlePoly.map, 'click', args[0]);
          $scope.handlingClick = false;
        }
      };

      $scope.mapsEventHandler = {
        'click': function(maps, eventName, args){
          /*
           * On map click, trigger the backend call to search for service areas for the clicked
           * location
           */
          var latLng = args[0].latLng;
          $scope.areas = Area.$search({'lat': latLng.lat(), 'long': latLng.lng()})
            .$then(function(){
              if ($scope.areas.length == 0){
                Message.error('Could not find any service area for that location');
              } else {
                Message.success('Found ' + $scope.areas.length + ' service areas for that location');
              }
            });
          Message.info(null, "Searching for service areas in that location");
        }
      };

      window.scope = $scope;
}]);
