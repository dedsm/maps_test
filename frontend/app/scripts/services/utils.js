'use strict';

var utilServices = angular.module('utilServices', []);
utilServices.factory('MessageUtils', [
  'toaster',
  function (toaster) {
    return {
      error: function (msg) {
        toaster.pop('error', 'Error', msg);
      },
      success: function (msg) {
        toaster.pop('success', 'Success', msg);
      },
      info: function(title, msg) {
        toaster.pop('info', title, msg);
      }
    };
  }
]);
