'use strict';
function forEach(array, action) {
  for (var i = 0; i < array.length; i++)
    action(array[i]);
}


/* Controllers */
angular.module('myApp.controllers', []).controller('MainCtrl', ['$scope', '$http',
    function($scope, $http) {
        $scope.initComp = function(params) {
            $scope.group = {};
            $scope.competition = {};
            // Set the competition id and get competition name
            $http.get("ajax/getComp.php?comp=" + params.comp).success(function(response) {
                if(typeof response == 'object') {
                    $scope.competition.name = response[0].comp_name;
                    $scope.competition.id = params.comp;
                } else {
                    $scope.competition.name = "NF";
                }
            });
        };
        $scope.initGroup = function(params) {
            $scope.group = {};
            $scope.competition = {};
            $http.get("ajax/getGroups.php?group=" + params.group).success(function(response) {
                if(typeof response == 'object') {
                    $scope.group = response[0];
                } else {
                    $scope.group.name = "NF";
                }
            });
        };
    }
]).controller('MyCtrl1', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams) {
        $scope.initComp($routeParams);
        $scope.initGroup($routeParams);
        $scope.data = {
            view: "Select your Teams",
            teams: [], // all teams
			p_teams: [], // picked teams
            you_picked: false,
            loading: true,
			complete: false,
			user_message: ""
        };
		var u_teams = []; // unpicked teams

        function getTeams() {
            $http.get("ajax/getTeams.php?comp=" + $scope.competition.id + "&group=" + $scope.group.group_id).success(function(response) {
                $scope.data.teams = response;
                console.log($scope.data.teams);
                $scope.data.loading = false;
				// Get list of unpicked teams
				for(var i = 0; i < $scope.data.teams.length; i++) {
					if($scope.data.teams[i].pick_name == null) {
						u_teams.push($scope.data.teams[i].team_id);
					}
				}
                console.log(u_teams);
				// If no teams available.
				if(u_teams.length == 0){
					$scope.data.complete = true;
				}
            });
        }
        function addPicks(team_id, user_name) {
            var parameters = {
                user: user_name,
                team: team_id,
                group: $scope.group.group_id
            };
            $http.get("ajax/addTeam.php", {params: parameters}).success(function(response) {
                console.log(response);
            });
        }
        $scope.pickTeams = function(form) {
            // Pick teams from list and add to the database.
            var rand = Math.floor(Math.random() * u_teams.length);
            var team_id = u_teams[rand];
            addPicks(team_id, $scope.data.pick_name);
            u_teams.splice(rand, 1);
            if(u_teams.length == 0){
                $scope.data.complete = true;
            }
            forEach($scope.data.teams, function(elem){
                if(elem.team_id == team_id){
                    elem.pick_name = $scope.data.pick_name;
                    $scope.data.p_teams.push(elem);
                }
            });
            $scope.data.you_picked = true;
//             console.log($scope.data.teams);
            $scope.data.pick_name = "";
            form.$setPristine();
        };
        // Watch for the competition and group to be set, then get teams.
        $scope.$watch("[competition.name, group.group_name]", function(newValue, oldValue) {
            if(oldValue != newValue && newValue[0] != undefined && newValue[1] != undefined) {
                getTeams();
            }
        }, true);
    }
]).controller('MyCtrl4', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams) {
        $scope.data = {
            view: "Manage Groups",
            loading: true,
            user_message: "",
            competition_set: false,
            comps: [],
            groups: false
        };
        $scope.groups = [];
        $scope.form = {};
        if($routeParams.comp){
            $scope.initComp($routeParams);
            $scope.data.groups = true;
        } else {
            $scope.data.groups = false;
            getComps();
        }
        
        function getComps() {
            $http.get("ajax/getComp.php").success(function(response) {
                console.log(response);
                if(typeof response == 'object') {
                    $scope.data.comps = response;
                } else {
                    $scope.data.user_message = "No competitions found.";
                }
                $scope.data.loading = false;
            });
        }

        function getGroups() {
            $http.get("ajax/getGroups.php?comp=" + $scope.competition.id).success(function(response) {
                if(typeof response == 'object') {
                    $scope.data.user_message = "";
                    $scope.groups = response;
                } else {
                    $scope.data.user_message = "No groups found for this competition.";
                    $scope.groups = [];                    
                }
                $scope.data.loading = false;
            });
        }
        $scope.addGroup = function(form) {
            if($scope.groups.length == 0) {
                var group_id = 5
            } else {
                var group_id = Number($scope.groups[$scope.groups.length - 1].group_id) + 5;
            }
            $scope.form.group_id = group_id;
			$scope.form.comp_id = $scope.competition.id;
            $scope.groups.push($scope.form);
            $http.get("ajax/addGroup.php", {
                params: $scope.form
            }).success(function(response) {
                $scope.data.response = response;
                console.log(response);
            });
            $scope.form = {};
            $scope.form.comp_id = $scope.competition.id;
            form.$setPristine();
        };
        // Watchers
        $scope.$watch('competition.name', function(newValue, oldValue) {
            // Watch for a valid competition being set then get groups.
            if(newValue == "NF") {
                $scope.data.user_message = "Competion not found. Please check address.";
            } else if(newValue != undefined) {
                getGroups();
            }
        });
    }
]);