'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('MyCtrl', ['$scope', function($scope) {
        $scope.data = {};
        $scope.data.view = "Main";
    }])
    .controller('MyCtrl1', ['$scope', function($scope) {
        // Instantiate an object to store your scope data in (Best Practices)
        $scope.data = {};
        $scope.data.view = "view 1";
    }])
    .controller('MyCtrl2', ['$scope', function($scope) {
        $scope.data = {};
        $scope.data.view = "view 2";
    }])
;