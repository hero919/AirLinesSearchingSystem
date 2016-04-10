/**
 * Created by zeqingzhang on 3/7/16.
 */
(function () {
    "use strict";

    angular.module('airlines')
        .config(config);

    function config($routeProvider) {
        console.log("Test02");
        $routeProvider.
            when('/mainpage', {
                templateUrl: 'views/mainpage/mainpage.view.html',
                controller:"MainpageController",
                controllerAs:"model"
            }).
            when('/login', {
                templateUrl: 'views/login/login.view.html',
                controller: 'LoginController',
                controllerAs: "model"
            }).
            when('/profile', {
                templateUrl: 'views/profile/profile.view.html',
                controller: 'ProfileController',
                controllerAs: "model",
                resolve: {
                    getLoggedIn: checkLoggedIn
                }

            }).

            when('/airlinesSearching', {
                templateUrl: 'views/airlinesSearching/airlinesSearching.view.html',
                controller: 'airlinesSearchingController',
                controllerAs: "model"
                //controllerAs: "model"
            }).
            when('/register', {
                templateUrl: 'views/register/register.view.html',
                controller: 'RegisterController',
                controllerAs: "model"

            }).
            when('/favoriteAirlines', {
                templateUrl: 'views/favoriteAirlines/favoriteAirlines.view.html',
                controller: 'favoriteAirlinesController',
                controllerAs: "model",
                resolve: {
                    getLoggedIn: checkLoggedIn
                }
            }).

            //#/api/project/airlines/{{airline._id}}/details

            when('/api/project/airlines/:flightId/details', {
                templateUrl: 'views/favoriteAirlines/favoriteAirlines.view.html',
                controller: 'favoriteAirlinesController',
                controllerAs: "model",
                resolve: {
                    getLoggedIn: checkLoggedIn
                }

            }).

            when('/api/project/hotels/:hotelId/:checkInDate/:checkOutDate/details', {
                templateUrl: 'views/favoriteAirlines/favoriteAirlines.view.html',
                controller: 'favoriteAirlinesController',
                controllerAs: "model",
                resolve: {
                    getLoggedIn: checkLoggedIn
                }

            }).




            when('/flightSearch', {
                templateUrl: 'views/airlinesSearching/airlinesSearching.view.html',
                controller: "airlinesSearchingController"
                // controllerAs:"model"
            }).
            when('/flightSearch/from/:flyFrom/to/:flyTo/:year/:month/:day/maxFlight/:maxFlight', {
                templateUrl: 'views/airlinesSearching/airlinesSearching.view.html',
                controller: "airlinesSearchingController"
                // controllerAs:"model"
            }).
            when('/hotelSearch', {
                templateUrl: 'views/hotelsSearching/hotelsSearching.view.html',
                controller: "hotelsSearchingController"
                //controllerAs:"model"
            }).
            when('/hotelSearch/location/:location/checkInDate/:checkInDate/checkOutDate/:checkOutDate/radius/:radius/maxHotels/:maxHotels', {
                templateUrl: 'views/hotelsSearching/hotelsSearching.view.html',
                controller: "hotelsSearchingController"
                //controllerAs:"model"
            }).

            otherwise({
                redirectTo: 'mainpage'
            });
    }






    function getLoggedIn(UserService, $q) {
        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response){
                var currentUser = response.data;
                UserService.setCurrentUser(currentUser);
                deferred.resolve();
            });

        return deferred.promise;
    }

    function checkLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response) {
                var currentUser = response.data;
                if(currentUser) {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/mainpage");
                }
            });

        return deferred.promise;
    }




























})();