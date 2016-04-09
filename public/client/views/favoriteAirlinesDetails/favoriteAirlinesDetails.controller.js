/**
 * Created by zeqingzhang on 3/30/16.
 */
(function(){
    'use strict';

    angular
        .module('airlines')
        .controller('favoriteAirlinesDetailsController', favoriteAirlinesDetailsController);


    function favoriteAirlinesDetailsController($routeParams, $scope,flightStatesService){
        var flightId = $routeParams.flightId;


        var flight = null;
        function init(){
            flight = flightStatesService.searchFlightById(flightId);
        }

        init();


        $scope.favoriteFlightDetails = flight;




    }




})();