'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('MainCtrl', ['$scope', '$http',  '$cookies', function($scope, $http, $cookies){
        $scope.user = {"loggedin":"false"}
		$scope.competition = {};
        $scope.group = {};
        if(typeof $cookies.loggedin != "undefined") {
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
        $scope.data.picked_teams = [];
        $scope.data.your_teams = [];
        $scope.form = {};
        $scope.data.picking = false;
        var maxpicks = 2;

        function getTeams(group){
            $http.get("ajax/getTeams.php?comp="+$scope.competition.id+"&group="+$scope.group.group_id).success(function(data){
                $scope.data.teams = data;
                var count = 0;
                for(var i=0; i < $scope.data.teams.length; i++){
                    if($scope.data.teams[i].user_id == null){
                        count++;
                    }
                }
                if(count == 0){
                    $scope.data.all_picked = true;
                }
            });
        };
        function updatePicks(team_id, user_id){
            $http.get("ajax/addTeam.php?user="+user_id+"&team="+team_id+"&group="+$scope.group.group_id).success(function(data){
                console.log(data);
            });
        };
        
        $scope.pickTeam = function(form) {
            // Get list of teams that are not picked
            // also get a list of users while in there.
            var user_exists = false;
            var teams = [];
            for(var i=0; i < $scope.data.teams.length; i++){
                if($scope.data.teams[i].user_id == null){
                    teams.push($scope.data.teams[i].team_id);
                }
                else 
                {
                    if($scope.data.teams[i].email == $scope.form.email){
                        user_exists = true;
                        $scope.data.picked_teams.push($scope.data.teams[i]);
                    }
                }
            }
            // console.log(teams);
            if(!user_exists){
                // Register user.
                $scope.registerUser($scope.form.email);
                $scope.form = {};
                form.$setPristine();
                // Pick teams from list
                for(var i=0; i<maxpicks; i++){
                    var rand = Math.floor(Math.random() * teams.length);
                    $scope.data.your_teams.push(teams[rand]);
                    console.log(i + " " + maxpicks + " " + rand + " " + teams.length);
                    delete teams[rand];
                    teams.splice(rand, 1);
                    console.log(teams.length);
                }
                // Update database only when the login is complete and teams are selected
            } else {
                $scope.data.user_message = "You've already picked teams.";
            }
        };
        
        // Watchers
        // Watch for the competition and group to be set, then get teams.
        $scope.$watch("[competition.name, group.group_name]", function(newValue, oldValue) {
            if(newValue[0] != undefined && newValue[1] != undefined){
                getTeams();
            }
        }, true);
        // Watch for teams to be picked (or user to login), and when
        // both are true, update database, then refresh.
        $scope.$watch("[data.your_teams, user.id]", function(newValue, oldValue){
            if($scope.data.your_teams.length == maxpicks && $scope.user.id != undefined){
                console.log($scope.user.id);
                for(var i=0; i<$scope.data.your_teams.length; i++){
                    updatePicks($scope.data.your_teams[i], $scope.user.id);
                }
                $scope.data.your_teams = [];
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
					
				} 
				else {
					$scope.groups = {};
                    $scope.data.user_message = "No groups found for this competition.";
					$scope.data.loading = false;
				}				
			})
		}
		
        $scope.addGroup = function(form){
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