myApp.controller("createWorkoutController", ["$scope", "$http", "$timeout", function ($scope, $http, $timeout) {

    $scope.newWorkout = {};
    $scope.selectedExercise = {};
    $scope.selectedWeek = {};
    $scope.selectedSession = {};
    $scope.muscleGroups = [];
    $scope.selected = {};
    $scope.showPopup = true;
    $scope.showSearchResults = true;

    $http.get("http://localhost/Sm%C3%A5flickor/api/workout/getmusclegroups").success(function (data) {
        $scope.muscleGroups = data;
        console.log(data);
    });

    $scope.GetExercisesByMuscleGroup = function (item) {
        $http.get("http://localhost/Sm%C3%A5flickor/api/workout/GetExercisesByMuscleGroup/" + item.Id).success(function (data) {
            $scope.exercises = data;
        })
    }

    $("#success-workout").hide();
    $scope.CreateWorkout = function () {
        $http.post("http://localhost/Sm%C3%A5flickor/api/workout/CreateWorkout", {
            Name: $scope.newWorkout.Name,
            Weeks: $scope.newWorkout.Weeks,
            Sessions: $scope.newWorkout.Sessions
        }).success(function (data) {
            $scope.workout = data;
            $scope.createSuccess = true;
            $("#success-workout").alert();
            $("#success-workout").fadeTo(2000, 500).slideUp(500, function () {
                $("#success-workout").hide();
            });
            console.log(data);
        }).catch(function (data) {
            $scope.workoutModelState = data.data.ModelState;
        });
    };

    $scope.AddExerciseToWorkout = function(){
        console.log($scope.set);
        $http.post("http://localhost/Sm%C3%A5flickor/api/workout/AddExerciseToWorkout", {
            WorkoutId: $scope.workout.Id,
            WeekId: $scope.selectedWeek.Id,
            SessionId: $scope.selectedSession.Id,
            ExerciseId: $scope.selectedExercise.Id,
            Set: $scope.set
        }).success(function(data){
            console.log(data);
        }).catch(function(data){
            
        });
    };
    
    $scope.AddNewSet = function () {
        var newItemNo = $scope.set.length + 1;
        $scope.set.push({ 'Number': newItemNo, Name: $scope.selectedExercise });
        console.log($scope.set);
    };

    $scope.RemoveSet = function () {
        var lastItem = $scope.set.length - 1;
        $scope.set.splice(lastItem);
    };

    $scope.SelectExercise = function (exercise) {
        $scope.selectedExercise = exercise;
        $scope.set = [{ Number: 1, Name: $scope.selectedExercise}];
        $scope.showSearchResults = !$scope.showSearchResults;
        console.log($scope.selectedExercise);
    };

    //Set initial value for week dropdown
    $scope.selectedWeek.WorkoutWeekNumber = "Select workout week";
    $scope.SelectWeek = function (item) {
        $scope.selectedWeek = item;
    }
    //Set initial value for session dropdown
    $scope.selectedSession.WorkoutDayNumber = "Select session in week";
    $scope.SelectSession = function(item){
        $scope.selectedSession = item;
        $scope.newSession = item;
        console.log($scope.newSession);  
    };

    $scope.SetMuscleFilter = function (item) {
        $scope.exerciseSearch = item.Name;
    }

    var pendingTask;
		  $scope.change = function (functionCall) {
        if (pendingTask) {
            clearTimeout(pendingTask);
        }
        if (functionCall == "fetch") {
            pendingTask = setTimeout(fetch, 600);
        } if (functionCall == "validate") {
            pendingTask = setTimeout(validate, 600);
        }
    };

    function fetch() {
        console.log($scope.exerciseSearch);
        $http.post("http://localhost/Sm%C3%A5flickor/api/workout/GetExercisesByName", {
            Name: $scope.exerciseSearch
        })
            .success(function (data) {
                $scope.searchResult = data;
                console.log(data);
                $scope.showSearchResults = true;
            });
    };

    function validate() {
        $http.post("http://localhost/Sm%C3%A5flickor/api/workout/ValidateName", {
            Name: $scope.newWorkout.Name
        }).success(function (data) {
            console.log(data);
        }).catch(function (data) {
            console.log(data);
        });
    };
    
    $scope.HideSearchResults = function(){
        $scope.showSearchResults = false;
    }

    $scope.ShowHideSearchResults = function () {
        $scope.showSearchResults = !$scope.showSearchResults;
    }
    
    $scope.hideContainer2 = true;
    $scope.scrollDown = true;
    $scope.CallScrollDown = function(){
        $scope.hideContainer2 = false;
        $timeout(ScrollDown, 4000);
    };
    function ScrollDown(){
        $scope.scrollDown = false;
    };
    
    //Scroll to top on page on page load
    $('html, body').animate({ scrollTop: -10000 }, 100);
}]);