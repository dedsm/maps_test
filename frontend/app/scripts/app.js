'use strict';

/**
 * @ngdoc overview
 * @name mozioApp
 * @description
 * # mozioApp
 *
 * Main module of the application.
 */
var mozioApp = angular.module('mozioApp', [
  'ui.router',
  'restmod',
  'ui.bootstrap',
  'uiGmapgoogle-maps'
]);

mozioApp.constant({'API_PREFIX': '/api/v1'});

mozioApp.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  'uiGmapGoogleMapApiProvider',
  'restmodProvider',
  'API_PREFIX',
  function ($stateProvider, $urlRouterProvider, $locationProvider, uiGmapGoogleMapApiProvider, restmodProvider, API_PREFIX){
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);

    uiGmapGoogleMapApiProvider.configure({
      v: '3.18',
      libraries: 'drawing',
      key: 'AIzaSyCUePHOUZ_pB5pL-r8Oy6aBQYdzgstz2Ds'
    });

    restmodProvider.rebase({
      $config: { urlPrefix: API_PREFIX }
    });

    restmodProvider.rebase({
      $hooks: {
        'before-request': function (_req) {
          _req.url += '/';
        }
      }
    });

    $stateProvider.state('maps', {
      url: '/',
      template: '<ui-view/>',
      abstract: true,
      data: {allowAny: false}
    }).state('maps.draw', {
      url: '',
      templateUrl: '/views/maps/draw.html',
      controller: 'MapsDrawController'
    }).
    state('maps.query', {
      url: 'query/',
      templateUrl: '/views/maps/query.html',
      controller: 'MapsQueryController'
    });
}]);
