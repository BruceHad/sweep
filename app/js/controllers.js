'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('MyCtrl1', ['$scope', '$http', function($scope, $http) {
        $scope.data = {};
        $scope.data.view = "Select Your Teams";
        function getUserGroups(){
            $http.get("ajax/getUserGroups.php").success(function(userGroups){
                $scope.data.userGroups = userGroups;
                getLists(userGroups);
            }); 
        };
        function getLists(groups){
            // console.log(groups);
            var comps = [];
            var users = [];
            for (var group in groups){
                if(comps.indexOf(groups[group].competition)==-1){
                    comps.push(groups[group].competition);
                }
            }
            $scope.data.comps = comps;
        };
        getUserGroups();
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
            // var data = {1: "Hello"};
            $http.get('ajax/addUser.php?name='+form.name+'&group='+form.group).success(function(response){
                console.log(response);
            });
        };
    }])
    .controller('MyCtrl3', ['$scope', '$http', function($scope, $http) {
        $scope.data = {};
        $scope.data.view = "Who is winning";

        function getUserGroups(){
            $http.get("ajax/getUserGroups.php").success(function(userGroups){
                $scope.data.userGroups = userGroups;
            }); 
        };

        function getTeams(){
            $http.get("ajax/getTeams.php").success(function(userGroups){
                $scope.data.teams = userGroups;
            }); 
        };
        getUserGroups();
        getTeams();
    }])
;