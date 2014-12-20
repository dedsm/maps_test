'use strict';

/**
 * @ngdoc function
 * @name mozioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mozioApp
 */
angular.module('mozioApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
