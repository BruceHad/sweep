'use strict';
function forEach(array, action) {
  for (var i = 0; i < array.length; i++)
    action(array[i]);
}


/* Controllers */
angular.module('myApp.controllers', []).controller('MainCtrl', ['$scope', '$http',
    function($scope, $http) {
        $scope.competition = {};
        $scope.group = {};
        $scope.initComp = function(params) {
            // Set the competition id and get competition name
            $http.get("ajax/getComp.php?comp=" + params.comp).success(function(data) {
                if(typeof data == 'object') {
                    $scope.competition.name = data[0].name;
                    $scope.competition.id = params.comp;
                } else {
                    $scope.competition.name = "NF";
                    $scope.user_message = "Something wrong with Competition Id. Please check the URL.";
                }
            });
        };
        $scope.initGroup = function(params) {
            $http.get("ajax/getGroups.php?group=" + params.group).success(function(data) {
                if(typeof data == 'object') {
                    $scope.group = data[0];
                } else {
                    $scope.group.name = "NF";
                    $scope.user_message = "Something wrong with Group Id. Please check the URL.";
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
            teams: [],
            you_picked: false,
            loading: true,
            user_name: ""
        };
        var maxpicks = 2;

        function getTeams() {
            $http.get("ajax/getTeams.php?comp=" + $scope.competition.id + "&group=" + $scope.group.group_id).success(function(data) {
                $scope.data.teams = data;
                console.log(data);
                $scope.data.loading = false;
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
        };
        $scope.pickTeams = function(form) {
            console.log(form);
            // Get list of unpicked teams
            var u_teams = []; // unpicked teams
            for(var i = 0; i < $scope.data.teams.length; i++) {
                if($scope.data.teams[i].user_id == null) {
                    u_teams.push($scope.data.teams[i].team_id);
                }
            }
            // If no teams available.
            if(u_teams.length == 0){
                $scope.data.user_message = "All teams have already been picked";               
            } else {
                // Pick teams from list and add to the database.
                var picks = Math.min(maxpicks, u_teams.length);
                for(var i = 0; i<picks; i++) {
                    var rand = Math.floor(Math.random() * u_teams.length);
                    var team_id = u_teams[rand];
                    console.log(team_id);
                    addPicks(team_id, $scope.data.user_name);
                    u_teams.splice(rand, 1);
                    $scope.data.you_picked = true;
                    forEach($scope.data.teams, function(element){
                        console.log(element);
                    });
                }
            }
        };
        // Watch for the competition and group to be set, then get teams.
        $scope.$watch("[competition.name, group.group_name]", function(newValue, oldValue) {
            if(oldValue != newValue && newValue[0] != undefined && newValue[1] != undefined) {
                getTeams();
            }
        }, true);
    }
]).controller('MyCtrl2', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams) {
        $scope.init($routeParams);
        $scope.data = {};
        $scope.data.view = "User Details";
        $scope.form = {};
        if(typeof $scope.group != 'undefined') {
            $scope.form.group = $scope.group;
        }
    }
]).controller('MyCtrl3', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams) {
        $scope.init($routeParams);
        $scope.data = {};
        $scope.data.view = "Who is winning";
    }
]).controller('MyCtrl4', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams) {
        $scope.data = {
            view: "Manage Groups",
            loading: true,
            user_message: "",
            competition_set: false
        };
        $scope.groups = [];
        $scope.form = {};
        $scope.initComp($routeParams);

        function getGroups() {
            $http.get("ajax/getGroups.php?comp=" + $scope.competition.id).success(function(data) {
                if(typeof data == 'object') {
                    $scope.data.user_message = "";
                    $scope.groups = data;
                    $scope.data.loading = false;
                } else {
                    $scope.groups = [];
                    $scope.data.user_message = "No groups found for this competition.";
                    $scope.data.loading = false;
                }
            })
        }
        $scope.addGroup = function(form) {
            if($scope.groups.length == 0) {
                var group_id = 5
            } else {
                var group_id = Number($scope.groups[$scope.groups.length - 1].group_id) + 5;
            }
            $scope.form.group_id = group_id;
            $scope.groups.push($scope.form);
            $http.get("ajax/addGroup.php", {
                params: $scope.form
            }).success(function(response) {
                $scope.data.response = response;
            });
            $scope.form = {};
            $scope.form.comp_id = $scope.competition.id;
            form.$setPristine();
        };
        // Watchers
        $scope.$watch('competition.name', function(newValue, oldValue) {
            // Watch for a valid competition being set.
            // then get groups.
            if(newValue == "NF") {
                $scope.data.user_message = "Competion not found. Please check address.";
            } else if(newValue != undefined) {
                console.log(newValue);
                $scope.form.comp_id = $scope.competition.id;
                getGroups();
            }
        });
    }
]);