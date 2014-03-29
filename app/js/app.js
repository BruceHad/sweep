'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
])
// disabling routing as it isn't playing nicely
// therefore partials are disabled
// and I need to define the controller in the template.
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/choose', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
  $routeProvider.when('/register', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.when('/progress', {templateUrl: 'partials/partial3.html', controller: 'MyCtrl3'});
  $routeProvider.otherwise({redirectTo: '/progress'});
}])
;
