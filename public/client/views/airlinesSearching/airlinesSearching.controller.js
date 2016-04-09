/**
 * Created by zeqingzhang on 3/8/16.
 */
(function(){
    'use strict';
    angular.
        module('airlines')
        .controller("airlinesSearchingController",airlinesSearchingController);


    //UserService, $rootScope, $location,$scope

    function airlinesSearchingController($scope, flightStatesService, tripService,$rootScope,$location,$routeParams){


        $scope.findDetails = findDetails;
        $scope.search = search;
        $scope.like = like;
        $scope.cancelLikeFlight = cancelLikeFlight;
        $scope.calculateAirportOrder = calculateAirportOrder;
        $scope.currentUser = $rootScope.currentUser;
       // $scope.checkFavorite = checkFavorite;

        function getAllUserLikes(){
            tripService.findUserLikeFlights().then(
                function(flights){
                    //console.log(flights);
                    var userLikeFlightsArray = [];
                    for(var i in flights.data){
                       userLikeFlightsArray.push(flights.data[i].flightId);
                    }
                    //console.log(userLikeFlightsArray);
                    $scope.userLikeFlightIds = userLikeFlightsArray;
                }
            )
        }
        if($rootScope.currentUser) {
            getAllUserLikes();
        }

        //function checkFavorite(flightId){
        //    var finalResult = null;
        //     tripService.checkFavoriteFlight(flightId).then(function(result){
        //        // console.log(result);
        //         finalResult = result.data;
        //     });
        //
        //    return finalResult;
        //
        //}


        function init() {
            if ($routeParams.flyFrom != null) {
                var flight = {
                    from: $routeParams.flyFrom,
                    to: $routeParams.flyTo,
                    year: $routeParams.year,
                    month: $routeParams.month,
                    day: $routeParams.day,
                    maxFlights: $routeParams.maxFlight
                };


                flightStatesService.searchFlightByAirport(flight).then(function (response) {
                    //console.log(response);
                    $scope.flights = response.flightStatuses;
                    // fromAirportInfo = response.appendix.airports[calculateAirportOrder(response,flight.from)];
                    // toAirportInfo = response.appendix.airports[calculateAirportOrder(response,flight.to)];

                    if (response.flightStatuses.length == 0) {
                        $scope.message = response.error.errorMessage;

                    } else {
                        $scope.message = "Successfully search " + response.flightStatuses.length + " results for you";

                    }

                })


            }
        }
        init();


        function cancelLikeFlight(flightId){
            tripService.cancelLikeFlight(flightId);
            getAllUserLikes();

        }



        function findAirlines(response, carrier){
            var array = response.appendix.airlines;
            for(var i in array){
                if(array[i].iata = carrier){
                    return array[i];
                }
            }
            return "Can not find the corresponding carrier."

        };




        function calculateAirportOrder(response, airportIATA){
            var airports = response.appendix.airports;
            for(var i in airports){
                if(airports[i].iata == airportIATA){
                    return i;
                }
            }

        }


        function findDetails(flightId){
            console.log(flightId);
            flightStatesService.searchFlightById(flightId).then(
                function(response){
                    var airlinesSharing = "";
                    $scope.airline = findAirlines(response, response.flightStatus.carrierFsCode);
                    $scope.flightDetails = response;
                    $scope.from = calculateAirportOrder(response, response.flightStatus.departureAirportFsCode);
                    $scope.to = calculateAirportOrder(response, response.flightStatus.arrivalAirportFsCode);

                    for(var line in response.appendix.airlines){
                        airlinesSharing=  airlinesSharing.concat(response.appendix.airlines[line].name).concat("/ ");

                    }
                    airlinesSharing = airlinesSharing.substring(0,airlinesSharing.length-2);
                    $scope.airlinesSharing = airlinesSharing;


                }
            )




        }






        function like(flight){
           tripService.userLikeFlight(flight);
            getAllUserLikes();

        }



        function search(flight){
            var from = flight.from;
            var to = flight.to;
            var year = flight.year;
            var month = flight.month;
            var day = flight.day;
            var maxFlights = flight.maxFlights;
            //Return the flight which just adding to the database
            $location.url('/flightSearch/from/' +
                from +
                '/to/' +
                to +
                '/' +
                year +
                '/' +
                month +
                '/' +
                day +
                '/maxFlight/' +
                maxFlights);
            //console.log("Search");
        }

    }

})();