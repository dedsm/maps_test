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
  function ($scope, uiGmapGoogleMapApi, drawChannel, clearChannel) {
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
      var clear = function(){
        $scope.map.polys = [];
      };
      var draw = function(){
        $scope.map.draw();//should be defined by now
      };
      //add beginDraw as a subscriber to be invoked by the channel, allows controller to controller coms
      drawChannel.add(draw);
      clearChannel.add(clear);

      $scope.$watchCollection('map.polys', function(newValues){
        console.log("polys changed");
      });

      window.scope = $scope;
    });
}]);
