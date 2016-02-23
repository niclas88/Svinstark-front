var myApp = angular.module("myApp", ["ngRoute", "ngAnimate", "smoothScroll", "auth0", "angular-storage", "angular-jwt", "ui.bootstrap"])
	.config(function (authProvider, $routeProvider, $locationProvider){
		$routeProvider.
			when("/", {templateUrl:"partials/home.html",
						controller: "menuController"}).
            when("/login",{templateUrl: "partials/login.html",
                           controller: "loginController"}).            
			when("/bmi", {templateUrl:"partials/bmi.html",
						  controller: "bmiController",
                          requiresLogin: true}).
			when("/bmr", {templateUrl: "partials/bmr.html",
						  controller: "bmrController",
                          requiresLogin: true}).
            when("/workout", {templateUrl: "partials/workout.html",
						  controller: "workoutController",
                          requiresLogin: true}).
            when("/createWorkout", {templateUrl: "partials/createWorkout.html",
						  controller: "createWorkoutController",
                          requiresLogin: true}). 
            when("/adminWorkout", {templateUrl: "partials/adminWorkout.html",
						  controller: "adminWorkoutController",
                          requiresLogin: true}).                                         
			when("/nutrition", {templateUrl: "partials/nutrition.html",
						  controller: "nutritionController",
                          requiresLogin: true}).
			otherwise({
				redirectTo: "/"
			});


	})
    .config(function (authProvider) {
  authProvider.init({
    domain: 'svinstark.eu.auth0.com',
    clientID: '4ikXye60r4K2uiAPSmbY4l9Bxp7u5nm7',
    callbackURL: location.href,
    loginUrl: "/login"
  });
})
.run(function(auth) {
  // This hooks al auth events to check everything as soon as the app starts
  auth.hookEvents();
})
.run(function($rootScope, auth, store, jwtHelper, $location) {
  // This events gets triggered on refresh or URL change
  $rootScope.$on('$locationChangeStart', function() {
    var token = store.get('token');
    if (token) {
      if (!jwtHelper.isTokenExpired(token)) {
        if (!auth.isAuthenticated) {
          auth.authenticate(store.get('profile'), token);
        }
      } else {
        // Either show the login page or use the refresh token to get a new idToken
        $location.path('/');
      }
    }
  })
});
