myApp.controller("adminWorkoutController", ["$scope", "$http", function($scope, $http){
    
	$scope.LimitedResult = {};
    // $scope.listOfItems = ["Bench", "Deadlift", "Squats", "Military Press"]
    $scope.newExercise =  {};
    $scope.selectedMuscleGroup = {};
    
    $http.get("http://localhost:58023/api/admin/getmusclegroups").success(function(data){
        $scope.muscleGroups = data;
    });
    
    $http.get("http://localhost:58023/api/admin/getexercises").success(function(data){
        $scope.listOfItems = data;
    });
    
    $scope.PostExercise = function(){
        $http.post("http://localhost:58023/api/admin/postexercise", {
            ExerciseId: $scope.newExercise.Id,
            ExerciseName: $scope.newExercise.Name,
            MuscleGroupId: $scope.selectedMuscleGroup.Id,
            MuscleGroupName: $scope.selectedMuscleGroup.Name
        }).success(function(data){
            $scope.listOfItems = data;
        });
    }
    
    $scope.exerciseMuscleGroup = "Select primary muscle group";
    $scope.selectNewExerciseMuscleGroup =  function(item){
        $scope.exerciseMuscleGroup = item.Name;
        $scope.selectedMuscleGroup = item;
    }
}]);