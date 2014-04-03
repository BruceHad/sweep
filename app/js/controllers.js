'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('MainCtrl', ['$scope', '$http',  '$cookieStore', function($scope, $http, $cookieStore){
        $scope.init = function(params){
            if(typeof params.comp != 'undefined'){
                $scope.comp = params.comp;
                $http.get("ajax/getComp.php?comp="+$scope.comp).success(function(data){
                    $scope.competition = data[0].name;
                });
            }
            console.log($scope.comp);
        };
        // if(typeof $routeParams.comp != 'undefined'){
        //     $scope.comp = $routeParams.comp;
        //     $http.get("ajax/getComp.php?comp="+$scope.comp).success(function(data){
        //         console.log(data);
        //     });
        // }
        // else {
        //     $scope.comp = "none";
        // }
        // if(typeof $routeParams.group != 'undefined'){
        //     $scope.comp = $routeParams.group;   
        // }
        // else {
        //     $scope.comp = "none";
        // }


        // if($cookieStore.get('loggedin')){
        //     $scope.id = $cookieStore.get('id');
        //     $scope.loggedin = true;
        //     $scope.username = $cookieStore.get('username');
        // } else {
        //     $scope.id = '';
        //     $scope.loggedIn = false;
        // }
        
        // $scope.comps = {
        //     'wc2014': 'World Cup 2014'
        // };

        $scope.getUsers = function(username) {
            $http.get("ajax/getUsers.php", {params: {name: username}})
            .success(function(query){
                var id = query[0].id;
                if(id > 0){
                    $scope.id = id;
                    $scope.loggedIn = true;
                    $cookieStore.put('id', id);
                    $cookieStore.put('loggedin', true);
                    $cookieStore.put('username', scope.username);
                } else {
                    $scope.userMessage = "Invalid username: "+$scope.username;
                    $scope.username = "";
                }
            });
        };

    }])
    .controller('MyCtrl1', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
        $scope.data = {};
        $scope.data.view = "Select Your Teams";
        $scope.form = {};
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
        function getTeams(){
            
        }
    }])
    .controller('MyCtrl2', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
        $scope.data = {};
        $scope.data.view = "Register";
        
        
        var comp = $routeParams.comp;
        function getGroups(){
            $http.get("ajax/getGroups.php?comp="+comp).success(function(groups){
                $scope.data.groups = groups;

            });

        };
        getGroups();
        $scope.registerUser = function(thisForm){
            // console.log($scope.form);
            $http.get('ajax/addUser.php?name='+$scope.form.name+'&group='+$scope.form.group).success(function(response){
                $scope.data.message = $scope.form.name + " has been registered";
                thisForm.$setPristine()
                $scope.form = {};
            });
        };
    }])
    .controller('MyCtrl3', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
        $scope.data = {};
        $scope.data.view = "Who is winning";
        var comp = $routeParams.comp;

        function getUserGroups(){
            $http.get("ajax/getUserGroups.php?comp="+comp).success(function(userGroups){
                $scope.data.userGroups = userGroups;
            }); 
        };

        function getTeams(){
            $http.get("ajax/getTeams.php?comp="+comp).success(function(userGroups){
                $scope.data.teams = userGroups;
            }); 
        };
        getUserGroups();
        getTeams();
    }])
    .controller('MyCtrl4', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
        $scope.data = {};
        $scope.data.view = "Edit All The Things";
        $scope.form = {};
        $scope.init($routeParams);
        $http.get("ajax/getGroups.php?comp="+$scope.comp).success(function(data){
            $scope.data.groups = data;
        });
        $scope.form.comp_id = $scope.comp;
        $scope.addGroup = function(){
            $http.get("ajax/addGroup.php?comp="+$scope.comp+"&name="+$scope.form.group_name).success(function(data){
                console.log(data);
            });
        };
    }])
;