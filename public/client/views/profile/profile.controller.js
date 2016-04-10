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
           UserService.getCurrentUser().then(function(response){
              // console.log(response);
           });
            $scope.username = $rootScope.currentUser.username;
            $scope.password = $rootScope.currentUser.password;
            $scope.verifiedPassword = $rootScope.currentUser.password;
            $scope.firstName = $rootScope.currentUser.firstName;
            $scope.lastName = $rootScope.currentUser.lastName;
            $scope.emails = $rootScope.currentUser.emails;
            $scope.company = $rootScope.currentUser.company;
        }

         init();



        $scope.update = function() {
            if ($scope.password != $scope.verifiedPassword) {
                $scope.message = "password not match!";
            } else {
                var updatedUser = {
                    "_id": $rootScope.currentUser._id,
                    "username": $scope.username,
                    "password": $scope.password,
                    "firstName": $scope.firstName,
                    "lastName": $scope.lastName,
                    "emails": $scope.emails,
                    "company" : $scope.company
                };
                UserService.updateUser($rootScope.currentUser._id, updatedUser).then(function (newUser) {
                   // console.log("User has already updated! ");
                   // console.log(newUser);
                    UserService.setCurrentUser(newUser);
                   // console.log($rootScope.currentUser);
                        if (newUser) {
                            $scope.message = 'User has already updated!';
                        } else {
                            $scope.message = 'Unable to update the user!';
                        }
                });
            }
        }

    }


})();