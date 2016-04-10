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
            //console.log(user.password);
            //console.log(user.verifiedPassword);
            if (user.password != user.verifiedPassword) {
                $scope.message = "Password not match!";
            } else {
                //console.log(user);
                UserService
                    .register(user)
                    .then(function (response) {
                        //console.log(response);
                        if (response.data) {
                            var currentUser = response;
                            //console.log(currentUser);
                            if (currentUser != null) {
                                //console.log(currentUser);
                                UserService.setCurrentUser(currentUser.data);
                                $location.url("/profile");
                            }
                        } else {
                            $scope.message = "The username has already used by others. Please use another username.";
                        }
                    });
            }
        }
    }




})();
