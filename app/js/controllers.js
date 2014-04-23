'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('MainCtrl', ['$scope', '$http',  '$cookies', function($scope, $http, $cookies){
        
        $scope.user = {"loggedin":"false"}
		$scope.user_message = "All good.";
		$scope.competition = {};
        if($cookies.loggedin == "true") {
            $scope.user = $cookies;
        }
        $scope.initComp = function(params){
			// Set the competition id and get competition name
			console.log(params.comp);
			$http.get("ajax/getComp.php?comp="+params.comp).success(function(data){
				if(typeof data == 'object'){
					$scope.competition.name = data[0].name;
					$scope.competition.id = params.comp;
				} 
				else {
					$scope.competition.name = "NF";
					$scope.user_message = "Something wrong with Competition";
				}

			});
		};
			
		$scope.initGroup = function(params){
            if(typeof params.group != 'undefined'){
                $scope.group = params.group;
            } 
            else {
                $scope.group = '';
            }
			return true;
        };

       $scope.login = function(email) {
            $http.get("ajax/getUsers.php", {params: {'email': email}}).success(function(data){
                if(typeof data == 'object'){
                    $scope.user = {
                        "id": data[0].user_id,
                        "username": data[0].username,
                        "email": data[0].email,
                        "url": data[0].av_url,
                        "loggedin": "true"
                    };
                    for(var prop in $scope.user){
                        $cookies[prop] = $scope.user[prop];
                    }
                } 
                else {
                    $scope.user_message = "Invalid user: " + email;
                }
            });

        };
        $scope.logout = function(){
            for (var prop in $cookies){
                delete $cookies[prop];
            }
            $scope.user = {"loggedin": "false"};
            $cookies = $scope.user;
        };
		
		// Watchers
		$scope.$watch('form.email', function(newValue, oldValue) {
			// If email address changes, clear the userMessage.
//             $scope.user_message = "";
        });

    }])
    .controller('MyCtrl1', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
        $scope.init($routeParams);
        $scope.data = {};
        $scope.data.view = "Select Your Teams";
        $scope.data.yourteams = [];
        $scope.data.maxpicks = 2;

        function getGroups(){
            // Gets the groups that the user is registered with.
            if($scope.user.loggedin){
                $http.get("ajax/getUserGroups.php?id="+$scope.user.id).success(function(data){
                    if(data.length == 1){
                        $scope.data.group_id = data[0].group_id;
                        getPicks(data);
                        getTeams(data);
                    } 
                    else if(typeof data != 'object' || data.length > 1) {
                        // console.log("User is registered with more than one group");
                        // console.log(data);
                    }
                });
            }
        }

        function getPicks(group){
            // Checks if the user has picked teams already, 
            // and if so, populates the yourteams array.
            $http.get("ajax/getPicks.php?user="+$scope.user.id+"&group="+group[0].group_id+"&comp="+$scope.comp).success(function(data){
                if(data != 'null'){
                    for (var i in data){
                        $scope.data.yourteams.push(data[i].name);
                    }
                    if(data.length >= $scope.data.maxpicks){
                        $scope.data.complete = true;
                        $scope.data.view = "Progress So Far";
                    }
                    $scope.data.picks = $scope.data.yourteams.length;
                }
            });
        }

        function getTeams(group){
            $scope.data.group_name = group[0].group_name;
            $http.get("ajax/getTeams.php?comp="+$scope.comp+"&group="+$scope.data.group_id).success(function(data){
                $scope.data.teams = data;
            });
        };
        function updatePicks(team){
            $http.get("ajax/addTeam.php?user="+$scope.user.id+"&team="+team+"&group="+$scope.data.group_id).success(function(data){
                console.log(data);
            });
        };
        $scope.pickTeam = function() {
            if($scope.data.picks >= $scope.data.maxpicks){
                console.log("Max picks exceeded");
                return;
            }
            var i = 1;
            var init = 100
            function myLoop(delay) {
                setTimeout(function() {
                    $scope.$apply(function() {
                        var rand = Math.floor(Math.random() * $scope.data.teams.length-1 + 1);
                        if($scope.data.teams[rand].user_id == null){
                            $scope.data.team = $scope.data.teams[rand].name;
                            var team_id = $scope.data.teams[rand].team_id;
                            i++;
                        } else {
                            myLoop(0);
                            // return;
                        }                        
                        if(i < 10) {
                            myLoop(init+Math.pow(i/3,3));
                        }
                        else {
                            $scope.data.yourteams.push($scope.data.team);
                            $scope.data.picks = $scope.data.yourteams.length;
                            // Insert into database and update object
                            updatePicks(team_id);
                            if($scope.data.picks >= $scope.data.maxpicks){
                                $scope.data.complete = true;
                                $scope.data.team = "";
                            }
                        }
                    });
                }, delay)
            }
            myLoop(100);
        };
        // Watchers
        $scope.$watch("loggedin", function(newValue, oldValue) {
			if($scope.user.loggedin){
				getGroups(); 
			}
			else {
				$scope.data = {};
				$scope.data.view = "Select Your Teams";
				$scope.data.yourteams = [];
				$scope.data.maxpicks = 2;
			}
        });
    }])
    .controller('MyCtrl2', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
        $scope.init($routeParams);
        $scope.data = {};
        $scope.data.view = "User Details";
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
        $scope.data = {
			view: "Manage Groups",
			loading: true,
			user_message: false,
			competition_set: false
		};
        $scope.form = {};
        $scope.initComp($routeParams);
		function getGroups(){
			$http.get("ajax/getGroups.php?comp="+$scope.competition.id).success(function(data){
				if(typeof data == 'object'){
					$scope.groups = data;
					$scope.data.loading = false;
					$scope.data.loaded = true;
				} 
				else {
					$scope.data.user_message = "Competition can't be found. Please check the address.";
				}				
			})
			.error(function(data){
				console.log(data);
			});
		}
		
        $scope.addGroup = function(){
            $http.get("ajax/addGroup.php?comp="+$scope.competition.id+"&group_name="+$scope.form.group_name)
            .success(function(data){
                $scope.data.response = data;
                $scope.form = {};
                $scope.init($routeParams);
                form.$setPristine();
            }).
            error(function(data){
                $scope.data.user_message = data;
            });
        };
		// Watchers
		$scope.$watch('competition.name', function(newValue, oldValue) {
			// Watch for a valid competition being set.
			// then get groups.
			if (newValue == "NF"){
				$scope.data.user_message = "Competion not found. Please check address.";
				$scope.data.loading = false;
			}
			else if(newValue != 'undefined'){
				$scope.form.comp_id = $scope.competition.id;
				getGroups();
			}
        });
    }])
;