myApp.controller("createWorkoutController", ["$scope", "$http", function($scope, $http){
	  
      $scope.selectedExercise = {};
      
      $http.get("http://localhost/Sm%C3%A5flickor/api/createworkout/getmusclegroups").success(function(data){
        $scope.muscleGroups = data;
        console.log(data);
    });
    
    $scope.GetExercisesByMuscleGroup  = function(item){
        $http.get("http://localhost/Sm%C3%A5flickor/api/createworkout/GetExercisesByMuscleGroup/" + item.Id).success(function(data){
            $scope.exercises = data;
        })
    }
      
      $scope.set = [{id: 'set1'}];
  
        $scope.AddNewSet = function() {
            var newItemNo = $scope.set.length+1;
            $scope.set.push({'id':'set'+newItemNo});
            console.log($scope.set);
        };
            
        $scope.RemoveSet = function() {
            var lastItem = $scope.set.length-1;
            $scope.set.splice(lastItem);
        };
        
        $scope.SelectExercise = function(exercise){
            $scope.selectedExercise = exercise;  
        };
}]);