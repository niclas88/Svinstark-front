myApp.controller("nutritionController", ["$http","$scope", function($http,$scope){

		var pendingTask;

		$scope.food = {};

		  $scope.change = function(){
		    if(pendingTask) {
		      clearTimeout(pendingTask);
		    }
		    pendingTask = setTimeout(fetch, 600);
		  };

			  function fetch() {
			    $http.get("http://localhost:56534/api/Livsmedel/" + 
			       $scope.search)
			     .success(function(response){
			     	$scope.food = response;
			     	console.log(response);
			     });
			     
			 }

			 
}]);