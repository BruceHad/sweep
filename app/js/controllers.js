'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('MainCtrl', ['$scope', '$http',  '$cookieStore', function($scope, $http, $cookieStore){
        $scope.loggedin = false;
        $scope.user = {};
        if($cookieStore.get('loggedin')){
            $scope.user.id = $cookieStore.get('id');
            $scope.loggedin = true;
            $scope.user.username = $cookieStore.get('username');
            $scope.user.email = $cookieStore.get('email');
        }
        $scope.$watch('form.email', function(newValue, oldValue) {
            $scope.userMessage = "";
        });

        $scope.init = function(params){

            if(typeof params.comp != 'undefined'){
                // Set the competition id and get competition name.
                $scope.comp = params.comp;
                $http.get("ajax/getComp.php?comp="+$scope.comp).success(function(data){
                    $scope.competition = data[0].name;
                });
                // Get all the groups
                $http.get("ajax/getGroups.php?comp="+$scope.comp).success(function(data){
                    $scope.groups = data;
                });
            } 
            else {
                $scope.comp = '';
            }

            if(typeof params.group != 'undefined'){
                $scope.group = params.group;
            } 
            else {
                $scope.group = '';
            }
            if($scope.loggedin){
                $http.get("ajax/getUserGroups.php?id="+$scope.user.id).success(function(data){
                    $scope.userGroups = data;
                });
            }
        };

       $scope.login = function(email) {
            $http.get("ajax/getUsers.php", {params: {'email': email}}).success(function(data){
                if(typeof data == 'object'){
                    $scope.user.id = data[0].user_id;
                    $scope.user.username = data[0].username;
                    $scope.user.email = data[0].email;
                    $scope.loggedin = true;
                    $cookieStore.put('id', data[0].user_id);
                    $cookieStore.put('loggedin', true);
                    $cookieStore.put('username', data[0].username);
                    $cookieStore.put('email', data[0].email);
                } 
                else {
                    $scope.userMessage = "Invalid user: " + email;
                }
            });
        };
        $scope.logout = function(){
            $cookieStore.remove('id');
            $cookieStore.remove('loggedin');
            $cookieStore.remove('username');
            $cookieStore.remove('email');
            $scope.user = {};
            $scope.loggedin = false;
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
    }])
    .controller('MyCtrl1', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
        $scope.init($routeParams);
        $scope.data = {};
        $scope.data.view = "Select Your Teams";
        $scope.data.yourteams = [];
        $http.get("ajax/getUserGroups.php?id="+$scope.user.id).success(function(data){
            $scope.data.groups = data;
            $scope.update();
        });
        $scope.update = function(){
            if($scope.data.groups.length == 1){
                $scope.data.group = $scope.data.groups[0].group_id;
                $scope.data.groupname = $scope.data.groups[0].group_name;
            } 
            else {
                console.log("More than one");
            }
            if(typeof $scope.data.group != 'undefined'){
                $http.get("ajax/getTeams.php?comp="+$scope.comp+"&group="+$scope.data.group).success(function(data){
                    $scope.data.teams = data;
                    console.log(data);
                });
            }
        };
        $scope.pickTeam = function() {
            var i = 1;
            var init = 100
            function myLoop(delay) {
                setTimeout(function() {
                    $scope.$apply(function() {
                        var rand = Math.floor(Math.random() * $scope.data.teams.length-1 + 1);
                        if($scope.data.teams[rand].user_id == null){
                            console.log("Not Picked");
                            $scope.data.team = $scope.data.teams[rand].name;
                            i++;
                        } else {
                            // console.log("Not Found");
                            myLoop(0);
                            return;
                        }                        
                        if(i < 10) {
                            myLoop(init+Math.pow(i/3,3));
                        }
                        else {
                            $scope.data.yourteams.push($scope.data.team);
                            // Insert into database and update object
                        }
                    });
                }, delay)
            }
            myLoop(100);
        };
    }])
    .controller('MyCtrl2', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
        $scope.init($routeParams);
        $scope.data = {};
        $scope.data.view = "Register";
        $scope.form = {};
        if(typeof $scope.group != 'undefined'){$scope.form.group = $scope.group;}
        $scope.registerUser = function(thisForm){
            $http.get('ajax/addUser.php?name='+$scope.form.name+'&email='+$scope.form.email+'&group='+$scope.form.group).success(function(response){
                $scope.data.message = $scope.form.name + " has been registered";
                $scope.login($scope.form.email);
                thisForm.$setPristine()
                $scope.form = {};
                if(typeof $routeParams.group != 'undefined'){
                    $scope.form.group = $routeParams.group;
                }
            });
        };
    }])
    .controller('MyCtrl3', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
        $scope.init($routeParams);
        $scope.data = {};
        $scope.data.view = "Who is winning";
    }])
    .controller('MyCtrl4', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
        $scope.data = {};
        $scope.data.view = "Edit All The Things";
        $scope.form = {};
        $scope.init($routeParams);
        $scope.form.comp_id = $scope.comp;
        $scope.addGroup = function(form){
            $http.get("ajax/addGroup.php?comp="+$scope.comp+"&group_name="+$scope.form.group_name)
            .success(function(data){
                $scope.data.message = data;
                $scope.form = {};
                $scope.init($routeParams);
                form.$setPristine();
            }).
            error(function(data){
                $scope.data.message = data;
            });
        };
    }])
;