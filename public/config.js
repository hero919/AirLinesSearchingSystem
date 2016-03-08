/**
 * Created by zeqingzhang on 3/7/16.
 */
(function () {
    "use strict";

    console.log("Test01");
    angular.module('airlines')
        .config(config);

    function config($routeProvider) {
        console.log("Test02");
        $routeProvider.
            when('/mainpage', {
                templateUrl: 'views/mainpage/mainpage.view.html'

            }).
            when('/login', {
                templateUrl: 'views/login/login.view.html',
                controller: 'LoginController'
            }).
            when('/profile', {
                templateUrl: 'views/profile/profile.view.html',
                controller: 'ProfileController'

            }).

            when('/services', {
                templateUrl: 'views/mainpage/mainpage.view.html'


            }).
            when('/register', {
                templateUrl: 'views/register/register.view.html',
                controller: 'RegisterController'

            }).
            when('/admin', {
                templateUrl: 'views/admin/admin.view.html'

            }).
            when('/form-fields', {
                templateUrl: 'views/form/form-fields.view.html'
            }).
            when('/logout', {
                templateUrl: 'views/home/home.view.html'

            }).
            otherwise({
                redirectTo: 'mainpage'
            });
    }
})();