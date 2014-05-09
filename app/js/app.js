'use strict';
// Declare app level module which depends on filters, and services
angular.module('myApp', ['ngRoute', 'ngCookies', 'myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers'])
.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider.when('/play/:comp/:group', {
            templateUrl: 'partials/partial1.html',
            controller: 'MyCtrl1'
        });
        $routeProvider.when('/edit/:comp?', {
            templateUrl: 'partials/partial4.html',
            controller: 'MyCtrl4'
        });
        $routeProvider.otherwise({
            redirectTo: '/edit/'
        });
        // use the HTML5 History API (for clean urls)
        $locationProvider.html5Mode(true);
    }
]);