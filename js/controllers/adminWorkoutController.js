myApp.controller("adminWorkoutController", ["$scope", "$http", function($scope, $http){
    
    $scope.newExercise =  {};
    $scope.newMuscleGroup = {};
    $scope.selectedMuscleGroup = {};
    
    $http.get("http://localhost/Sm%C3%A5flickor/api/admin/getmusclegroups").success(function(data){
        $scope.muscleGroups = data;
    });
    
    $http.get("http://localhost/Sm%C3%A5flickor/api/admin/getexercises").success(function(data){
        $scope.exercises = data;
    });
    
    $("#success-exercise").hide();
    $scope.PostExercise = function(){
        $http.post("http://localhost/Sm%C3%A5flickor/api/admin/postexercise", {
            Id: $scope.newExercise.Id,
            Name: $scope.newExercise.Name,
            PrimaryTargetMuscle: {
                Id: $scope.selectedMuscleGroup.Id
            } 
        }).success(function(data){
            $scope.exercises = data;
            $("#success-exercise").alert();
                $("#success-exercise").fadeTo(2000, 500).slideUp(500, function(){
                    $("#success-exercise").hide();
                });
        }).catch(function(data){
            $scope.exerciseModelState = data.data.ModelState;
        });
    }
    
    $scope.DeleteExercise = function(item) {
        console.log(item);
        $http.delete("http://localhost/Sm%C3%A5flickor/api/admin/DeleteExercise",{
            Id: item.Id,
            Name: item.Name,
        }).success(function(data){
            $scope.exercises = data;
        }).catch(function(data){
            
        });
    };
    
    $("#success-muscle").hide();
    $scope.PostMuscleGroup = function(){
        $http.post("http://localhost/Sm%C3%A5flickor/api/admin/postmusclegroup", {
            Name: $scope.newMuscleGroup.Name
        }).success(function(data){
           $scope.muscleGroups = data;
           $("#success-muscle").alert();
                $("#success-muscle").fadeTo(2000, 500).slideUp(500, function(){
                    $("#success-muscle").hide();
                });
        });
    }
    
    $scope.exerciseMuscleGroup = "Select primary muscle group";
    $scope.selectNewExerciseMuscleGroup =  function(item){
        $scope.exerciseMuscleGroup = item.Name;
        $scope.selectedMuscleGroup = item;
    }
}]);