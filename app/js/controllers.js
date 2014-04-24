'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('MainCtrl', ['$scope', '$http',  '$cookies', function($scope, $http, $cookies){
        
        $scope.user = {"loggedin":"false"}
		$scope.user_message = "All good.";
		$scope.competition = {};
        $scope.group = {};
        if($cookies.loggedin == "true") {
            $scope.user = $cookies;
        }
        $scope.initComp = function(params){
			// Set the competition id and get competition name
			$http.get("ajax/getComp.php?comp="+params.comp).success(function(data){
				if(typeof data == 'object'){
					$scope.competition.name = data[0].name;
					$scope.competition.id = params.comp;
				} 
				else {
					$scope.competition.name = "NF";
					$scope.user_message = "Something wrong with Competition Id. Please check the URL.";
				}

			});
		};
			
		$scope.initGroup = function(params){
            $http.get("ajax/getGroups.php?group="+params.group).success(function(data){
				if(typeof data == 'object'){
					$scope.group = data[0];
				} 
				else {
					$scope.group.name = "NF";
					$scope.user_message = "Something wrong with Group Id. Please check the URL.";
				}

			});
        };
        
        $scope.registerUser = function(email){
            $http.get('ajax/addUser.php?email='+email+'&group='+$scope.group.group_id).success(function(response){
//                 $scope.data.user_message = email + " has been registered";
                 console.log(response);
                $scope.form = {};
                $scope.login(email);
            });
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
        $scope.initComp($routeParams);
		$scope.initGroup($routeParams);
        $scope.data = {};
        $scope.data.view = "Select Your Teams";
        $scope.data.yourteams = [];
        $scope.form = {};
        $scope.data.picking = false;
        
        

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
            $http.get("ajax/getTeams.php?comp="+$scope.competition.id+"&group="+$scope.group.group_id).success(function(data){
                $scope.data.teams = data;
            });
        };
        function updatePicks(team){
            console.log("h");
            $http.get("ajax/addTeam.php?user="+$scope.user.id+"&team="+team+"&group="+$scope.group.group_id).success(function(data){
                console.log(data);
            });
        };
        
        $scope.pickTeam = function(form) {
            // Get list of teams that are not picked
            // also get a list of users while in there.
            var teams = [];
            var users = [];
            var user_exists = false;
            for(var i=0; i < $scope.data.teams.length; i++){
                if($scope.data.teams[i].user_id == null){
                    teams.push($scope.data.teams[i].team_id);
                }
                else 
                {
                    if($scope.data.teams[i].email == $scope.form.email){
                        user_exists = true;
                    }
                }
            }
//             console.log("Y");
            if(!user_exists){
                // Register user.
//                 console.log("Z");
                $scope.registerUser($scope.form.email);
//                 console.log("A");
                // Pick teams from list
                while(true){
                    console.log("A");
                    if($scope.user.loggedin){
                        for(var i=0; i<2; i++){
                            var rand = Math.floor(Math.random() * teams.length);
                            $scope.data.yourteams.push(teams[rand]);
                            delete teams[rand];
                        }
                        // Update database
//                         for(var i=0; i<$scope.data.yourteams.length; i++){
//                             updatePicks($scope.data.yourteams[i]);
//                         }
                        break;
                    }
                }
            } else {
                $scope.data.user_message = "You've already picked teams.";
            }
        };
        
        // Watchers
        $scope.$watch("[competition.name, group.group_name]", function(newValue, oldValue) {
			if(newValue[0] != undefined && newValue[1] != undefined){
                getTeams();
            }
             
        }, true);
        
    }])
    .controller('MyCtrl2', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
        $scope.init($routeParams);
        $scope.data = {};
        $scope.data.view = "User Details";
        $scope.form = {};
        if(typeof $scope.group != 'undefined'){$scope.form.group = $scope.group;}
        
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
					$scope.data.user_message = "";
					$scope.groups = data;
					$scope.data.loading = false;
					$scope.data.loaded = true;
					
				} 
				else {
					$scope.groups = {};
					$scope.data.loading = false;
				}				
			})
		}
		
        $scope.addGroup = function(form){
			console.log($scope.form.group_name);
            $http.get("ajax/addGroup.php?comp="+$scope.competition.id+"&group_name="+$scope.form.group_name)
            .success(function(data){
                $scope.data.response = data;
                $scope.form = {};
                form.$setPristine();
				getGroups();
            })
        };
		// Watchers
		$scope.$watch('competition.name', function(newValue, oldValue) {
			// Watch for a valid competition being set.
			// then get groups.
			if (newValue == "NF"){
				$scope.data.user_message = "Competion not found. Please check address.";
			}
			else if(newValue != 'undefined'){
				$scope.form.comp_id = $scope.competition.id;
				getGroups();
			}
        });
    }])
;