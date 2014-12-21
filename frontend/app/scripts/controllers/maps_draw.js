'use strict';

/**
 * @ngdoc function
 * @name mozioApp.controller:MapsDrawController
 * @description
 * # MapsDrawController
 * Controller of the mozioApp
 */
var mozioApp = angular.module('mozioApp');

mozioApp.factory('channel', function(){
  return function () {
    var callbacks = [];
    this.add = function (cb) {
      callbacks.push(cb);
    };
    this.invoke = function () {
      callbacks.forEach(function (cb) {
        cb();
      });
    };
    return this;
  };
});

mozioApp.service('drawChannel', ['channel', function(channel){
  return new channel();
}]);

mozioApp.service('clearChannel', ['channel', function(channel){
  return new channel();
}]);

mozioApp.controller('mapWidgetCtrl', ['$scope', 'drawChannel','clearChannel', function ($scope, drawChannel, clearChannel) {
  $scope.drawWidget = {
    controlText: 'draw',
    controlClick: function () {
      drawChannel.invoke()
    }
  };
  $scope.clearWidget = {
    controlText: 'clear',
    controlClick: function () {
      clearChannel.invoke()
    }
  };
}]);

mozioApp.controller('MapsDrawController', [
  '$scope',
  'uiGmapGoogleMapApi',
  'drawChannel',
  'clearChannel',
  'Area',
  function ($scope, uiGmapGoogleMapApi, drawChannel, clearChannel, Area) {
    uiGmapGoogleMapApi.then(function(maps){
      $scope.map = {
        center: {
          latitude: 53.406754,
          longitude: -2.158843
        },
        pan: true,
        zoom: 14,
        refresh: false,
        options: {
          disableDefaultUI: true
        },
        events: {},
        bounds: {},
        polys: [],
        draw: undefined
      };

      $scope.newArea = Area.$build();
      
      var clear = function(){
        $scope.map.polys = [];
      };
      var draw = function(){
        $scope.map.draw();//should be defined by now
      };
      //add beginDraw as a subscriber to be invoked by the channel, allows controller to controller coms
      drawChannel.add(draw);
      clearChannel.add(clear);

      $scope.$watchCollection('map.polys', function(polys){
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
          clear();
        });
      };
    });
}]);
