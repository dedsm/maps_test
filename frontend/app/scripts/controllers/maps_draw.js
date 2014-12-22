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

      $scope.drawing = false;

      $scope.newArea = Area.$build();
      
      $scope.clear = function(){
        $scope.map.polys = [];
      };

      $scope.draw = function(){
        $scope.drawing = true;
        $scope.showLastAreas = false;
        $scope.map.draw();//should be defined by now
      };

      $scope.$watch('showLastAreas', function(){
        if ($scope.showLastAreas){
          $scope.areas = Area.$search({'last': 10});
        } else {
          $scope.areas = Area.$collection();
        }
      });

      $scope.searchbox = {
        events: {
          places_changed: function (searchBox) {
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

      $scope.$watchCollection('map.polys', function(polys){
        $scope.drawing = false;
        if (polys.length == 0) {
          $scope.newArea.poly = null;
          return;
        }
        var polygon = {'type': 'Polygon', 'coordinates': []};
        var coords = [];
        var poly_coords = polys[0].getPath().getArray();
        for (var i=0; i != poly_coords.length; i++){
          coords.push([poly_coords[i].lng(), poly_coords[i].lat()]);
        }
        coords.push([poly_coords[0].lng(), poly_coords[0].lat()]);

        polygon.coordinates = [coords];

        $scope.newArea.poly = polygon;
      });

      $scope.saveArea = function(){
        $scope.newArea.$save().$then(function(){
          $scope.newArea = Area.$build();
          $scope.clear();
        });
      };
    });
}]);
