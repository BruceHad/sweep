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
        
        $scope.addUser = function(form, data){
            data.group_id = $scope.group.group_id;
            $http.get("ajax/addUser.php", {params: data}).success(function(response){
                $scope.login(data);
                $scope.form = {};
                form.$setPristine();
            });
        };
        
        $scope.login = function(data) {
            $http.get("ajax/getUsers.php", {params: data}).success(function(response){
                if(typeof response == 'object'){
                    $scope.user = {
                        "id": response[0].user_id,
                        "username": response[0].username,
                        "email": response[0].email,
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
        $scope.data.picked_teams = [];
        $scope.data.complete = false;
        $scope.data.view = "Select Your Teams";
        $scope.form = {};
        $scope.data.picking = false;
        var maxpicks = 2;

        function getTeams(group){
            $http.get("ajax/getTeams.php?comp="+$scope.competition.id+"&group="+$scope.group.group_id).success(function(data){
                $scope.data.teams = data;
                console.log(data);
                var count = 0;
                for(var i=0; i < data.length; i++){
                    if(data[i].user_id == null){
                        count++;
                    }
                    if(data[i].email == $scope.user.email && $scope.user.email != null){
                        $scope.data.picked_teams.push({
                            team_id: data[i].team_id,
                            team_name: data[i].name,
                            team_status: data[i].status});
                    }
                }
                if(count == 0 || $scope.data.picked_teams.length == maxpicks){
                    $scope.data.complete = true;
                    if(count == 0) $scope.data.all_picked = true;
                    if($scope.data.picked_teams.length == maxpicks) $scope.data.you_picked = true;
                }
            });

        }

        function addPicks(team_id){
            var data = {
                user: $scope.user.id,
                team: team_id,
                group: $scope.group.group_id
            };
            $http.get("ajax/addTeam.php", {params: data}).success(function(response){
                console.log(response);
            });
        };
        
        $scope.pickTeams = function() {
            // Get list of teams that are not picked
            var all_teams = $scope.data.teams; // full team list
            var teams = []; // unpicked teams
            var your_teams = []; // teams that have been picked
            for(var i=0; i < all_teams.length; i++){
                if(all_teams[i].user_id == null){
                    teams.push(all_teams[i].team_id);
                }
            }
            // Pick teams from list
            for(var i=0; i<maxpicks; i++){
                var rand = Math.floor(Math.random() * teams.length);
                your_teams.push(teams[rand]);
                addPicks(teams[rand]);
                delete teams[rand];
                teams.splice(rand, 1);
                $scope.data.complete = true;
            }
            for(var i=0; i < all_teams.length; i++){             
                if(your_teams.indexOf(all_teams[i].team_id) != -1){
                    all_teams[i].email = $scope.user.email;
                    all_teams[i].user_id = $scope.user.id;
                    all_teams[i].user_name = $scope.user.username;
                    $scope.data.picked_teams.push({
                        team_id: all_teams[i].team_id,
                        team_name: all_teams[i].name,
                        team_status: all_teams[i].status
                    });
                }
            }
        };
        
        // Watchers
        // Watch for the competition and group to be set, then get teams.
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
                } 
                else {
                    $scope.groups = [];
                    $scope.data.user_message = "No groups found for this competition.";
                    $scope.data.loading = false;
                }               
            })
        }

        $scope.addGroup = function(form){
            var group_id = Number($scope.groups[$scope.groups.length-1].group_id)+5;
            $scope.form.group_id = group_id;
            $scope.groups.push($scope.form);
            $http.get("ajax/addGroup.php", {params: $scope.form}).success(function(response){
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