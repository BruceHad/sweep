'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
])
// disabling routing as it isn't playing nicely
// therefore partials are disabled
// and I need to define the controller in the template.
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/choose/:comp/:group?', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
  $routeProvider.when('/register/:comp/:group?', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.when('/progress/:comp/:group?', {templateUrl: 'partials/partial3.html', controller: 'MyCtrl3'});
  $routeProvider.when('/edit/:comp/:group?', {templateUrl: 'partials/partial4.html', controller: 'MyCtrl4'});
  $routeProvider.otherwise({redirectTo: '/register/:comp/:group?  '});
}])
;
