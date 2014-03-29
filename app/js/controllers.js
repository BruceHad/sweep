'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('MyCtrl1', ['$scope', '$http', function($scope, $http) {
        $scope.data = {};
        $scope.data.view = "Select Your Teams";
    }])
    .controller('MyCtrl2', ['$scope', '$http', function($scope, $http){
        $scope.data = {};
        $scope.data.view = "Register";
        function getGroups(){
            $http.get("ajax/getGroups.php").success(function(groups){
                $scope.data.groups = groups;
            });
        };
        getGroups();

        $scope.registerUser = function(form){
            console.log(form);
        };
    }])
    .controller('MyCtrl3', ['$scope', function($scope) {
        $scope.data = {};
        $scope.data.view = "Who is winning";
    }])
;