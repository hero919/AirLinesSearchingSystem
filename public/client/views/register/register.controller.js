/**
 * Created by zeqingzhang on 3/7/16.
 */
(function(){
    "use strict";
    angular.
        module('airlines')
        .controller('RegisterController',RegisterController);

    //UserService, $rootScope, $location,$scope
    function RegisterController() {

        //var vm = this;


    //
    //    $scope.register =
    //        function (){
    //
    //            if ($scope.password === $scope.verifyPassword) {
    //                var newUser = {
    //                    "username": $scope.username,
    //                    "password": $scope.password,
    //                    "email": $scope.email
    //                };
    //                UserService.createUser(newUser, function (newUser) {
    //                    $rootScope.newUser = newUser;
    //                    $location.url("/profile");
    //
    //                });
    //                console.log(newUser);
    //            }
    //            else{
    //                alert("The password is not the same as verified password.");
    //            }
    //        }
    }




})();
