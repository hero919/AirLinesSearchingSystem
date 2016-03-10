/**
 * Created by zeqingzhang on 3/8/16.
 */
(function(){
    'use strict';
    angular.
        module('airlines')
        .controller('ProfileController',ProfileController);

    function ProfileController($rootScope,$scope, UserService){

        $scope.message = null;

        function init() {
            $scope.username = $rootScope.currentUser.username;
            $scope.password = $rootScope.currentUser.password;
            $scope.firstName = $rootScope.currentUser.firstName;
            $scope.lastName = $rootScope.currentUser.lastName;
            $scope.email = $rootScope.currentUser.email;


        }
         init();



        $scope.update = function(){
            var updatedUser = {
                "_id": $rootScope.currentUser._id,
                "username": $scope.username,
                "password": $scope.password,
                "firstName": $scope.firstName,
                "lastName": $scope.lastName,
                "email": $scope.email

            };
            UserService.updateUser($rootScope.currentUser._id, updatedUser).then(function(newUser){
                console.log("User has already updated! "+newUser.username);
                $rootScope.currentUser = newUser;

                if(newUser){
                    $scope.message = 'User has already updated!';
                }else{
                    $scope.message = 'Unable to update the user!';
                }
            });

        }

    }


})();