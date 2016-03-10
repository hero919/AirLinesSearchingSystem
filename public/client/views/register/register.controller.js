/**
 * Created by zeqingzhang on 3/7/16.
 */
(function(){
    "use strict";
    angular.
        module('airlines')
        .controller('RegisterController',RegisterController);

    //UserService, $rootScope, $location,$scope
    function RegisterController(UserService, $scope, $location) {
        $scope.register = register;


        function register(user) {
            console.log(user);
            UserService
                .register(user)
                .then(function(response){
                    var currentUser = response;
                    if(currentUser != null) {
                        console.log(currentUser);
                        UserService.setCurrentUser(currentUser);
                        $location.url("/profile");
                    }
                });
        }
    }




})();
