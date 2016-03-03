myApp.controller("adminWorkoutController", ["$scope", "$http", function($scope, $http){

    $scope.newExercise =  {};
    $scope.editExercise = {};
    $scope.newMuscleGroup = {};
    $scope.selectedMuscleGroup = {};
    $scope.muscleGroupAlert = {};
    $scope.outputSecondaryMuscleGroups = [];
    
    $http.get("http://localhost/Sm%C3%A5flickor/api/admin/getmusclegroups").success(function(data){
        $scope.muscleGroups = data;
    });
    
    $http.get("http://localhost/Sm%C3%A5flickor/api/admin/getexercises").success(function(data){
        $scope.exercises = data;
        console.log(data);
    });
    
    $scope.exerciseData = {
        Id: $scope.newExercise.Id,
            Name: $scope.newExercise.Name,
            SecondaryTargetMuscles: $scope.outputSecondaryMuscleGroups
    }
    
    $("#success-exercise").hide();
    $scope.PostExercise = function(){
        $http.post("http://localhost/Sm%C3%A5flickor/api/admin/postexercise", {
            Id: $scope.newExercise.Id,
            Name: $scope.newExercise.Name,
            PrimaryTargetMuscle: {
                Id: $scope.selectedMuscleGroup.Id
            },
            SecondaryTargetMuscles: $scope.outputSecondaryMuscleGroups
        }).success(function(data){
            $scope.exercises = data;
            $("#success-exercise").alert();
                $scope.muscleGroupAlert.success = "The item was successfully added to the database.";
                $("#success-exercise").fadeTo(2000, 500).slideUp(500, function(){
                    $("#success-exercise").hide();
                });
        }).catch(function(data){
            $scope.exerciseModelState = data.data.ModelState;
        });
    }
    
    $scope.PutExercise = function(item) {
        $http.post("http://localhost/Sm%C3%A5flickor/api/admin/PutExercise", {
            Id: item.Id,
            Name: item.Name
        }).success(function(data){
            $scope.exercises = data;
        }).catch(function(data){
            $scope.exercisePutModelState = data.data.ModelState;
            
            $http.get("http://localhost/Sm%C3%A5flickor/api/admin/getexercises").success(function(data){
                $scope.exercises = data;
            });
        });
    };
    
    $scope.DeleteExercise = function(item) {
        $http.delete("http://localhost/Sm%C3%A5flickor/api/admin/DeleteExercise/" + item.Id).success(function(data){
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
    
    $scope.DeleteMuscleGroup = function(item){
        $http.delete("http://localhost/Sm%C3%A5flickor/api/admin/DeleteMuscleGroup/" + $scope.muscleGroupToDelete.Id).success(function(data){
            $scope.muscleGroups = data;
            $("#success-muscle").alert();
                $scope.muscleGroupAlert.success = "The item was successfully deleted from the database.";
                $("#success-muscle").fadeTo(2000, 500).slideUp(500, function(){
                    $("#success-muscle").hide();
                });
            $scope.muscleGroup = "Delete muscle group";
        }).catch(function(data){
            
        });  
    };
    
    $scope.EditExercise = function(item){
        item.editName = true;  
    };
    
    $scope.muscleGroup = "Delete muscle group";
    $scope.selectMuscleGroup = function(item){
        $scope.muscleGroup = item.Name;
        $scope.muscleGroupToDelete = item;
    };
    
    $scope.exerciseMuscleGroup = "Select primary muscle group";
    $scope.selectNewExerciseMuscleGroup =  function(item){
        $scope.exerciseMuscleGroup = item.Name;
        $scope.selectedMuscleGroup = item;
    }
    
    $scope.exerciseMuscleGroupFilter = "Muscle group"
    $scope.SetMuscleGroupFilter = function(item){
        $scope.exerciseMuscleGroupFilter = item.Name;
    };
    
}]);