myApp.directive("nameExists", ["$http", "$q", function ($http, $q) {
    return {
        restrict: "A",
        require: "^ngModel",
        link: function (scope, element, attributes, ngModel) {
            ngModel.$asyncValidators.nameExists = function (modelValue) {
                return $q(function (resolve, reject) {
                    $http.post("http://localhost/Sm%C3%A5flickor/api/workout/ValidateName", {
                        Name: modelValue
                    }).success(function (data) {
                        if (data == true) {
                            resolve();
                        } else {
                            reject();
                        }
                    });
                });
            };
        }
    };
}]);

