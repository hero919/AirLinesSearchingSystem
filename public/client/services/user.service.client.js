/**
 * Created by zeqingzhang on 3/9/16.
 */
(function(){
    "use strict";
    angular.
        module('airlines')
        .factory('UserService', UserService);



    function UserService($http, $q,$rootScope) {
        var api = {
            login: login,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            register: register,
            logout: logout,
            getProfile: getProfile,
            updateUser: updateUser
        };
        return api;


        function updateUser(userId, user){
            var deferred = $q.defer();
            $http.put('/api/project/airlines/user/'+ userId,user).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;


        }



        function getProfile() {
            return $http.get("/api/project/airlines/profile/"+$rootScope.currentUser._id);
        }

        function register(user) {
          return $http.post("/api/project/airlines/register", user);

        }

        function logout() {
            return $http.post("/api/project/airlines/logout");
        }

        function getCurrentUser() {
            return $http.get("/api/project/airlines/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function login(credentials) {
            var deferred = $q.defer();

            //console.log(credentials);
            $http.post("/api/project/airlines/login", credentials).success(
                function(response){
                    //console.log(response);
                    deferred.resolve(response);
                }

            );
            return deferred.promise;
        }
    }
})();