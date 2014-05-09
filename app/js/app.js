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
    $routeProvider.when('/play/:comp/:group', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
  $routeProvider.when('/edit/:comp?', {templateUrl: 'partials/partial4.html', controller: 'MyCtrl4'});
  $routeProvider.otherwise({redirectTo: '/edit/'});
}])
;
