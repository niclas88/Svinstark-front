myApp.controller("adminWorkoutController", ["$scope", "$http", function($scope, $http){
    
    $scope.newExercise =  {};
    $scope.newMuscleGroup = {};
    $scope.selectedMuscleGroup = {};
    $scope.exercises = {};
    
    $http.get("http://localhost/Sm%C3%A5flickor/api/admin/getmusclegroups").success(function(data){
        $scope.muscleGroups = data;
    });
    
    $http.get("http://localhost/Sm%C3%A5flickor/api/admin/getexercises").success(function(data){
        $scope.exercises = data;
    });
    
    $scope.PostExercise = function(){
        $http.post("http://localhost/Sm%C3%A5flickor/api/admin/postexercise", {
            Id: $scope.newExercise.Id,
            Name: $scope.newExercise.Name,
            PrimaryTargetMuscle: {
                Id: $scope.selectedMuscleGroup.Id
            } 
        }).success(function(data){
            $scope.exercises = data;
        });
    }
    
    $("#success-alert").hide();
    $scope.PostMuscleGroup = function(){
        $http.post("http://localhost/Sm%C3%A5flickor/api/admin/postmusclegroup", {
            Name: $scope.newMuscleGroup.Name
        }).success(function(data){
           $scope.muscleGroups = data;
           $("#success-alert").alert();
                $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
                    $("#success-alert").hide();
                });
        });
    }
    
    $scope.exerciseMuscleGroup = "Select primary muscle group";
    $scope.selectNewExerciseMuscleGroup =  function(item){
        $scope.exerciseMuscleGroup = item.Name;
        $scope.selectedMuscleGroup = item;
    }
}]);