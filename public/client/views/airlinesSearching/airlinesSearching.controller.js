/**
 * Created by zeqingzhang on 3/8/16.
 */
(function(){
    'use strict';
    angular.
        module('airlines')
        .controller("airlinesSearchingController",airlinesSearchingController);


    //UserService, $rootScope, $location,$scope

    function airlinesSearchingController($scope, flightStatesService, $rootScope){

        $scope.findDetails = findDetails;
        $scope.search = search;
        $scope.like = like;
        $scope.calculateAirportOrder = calculateAirportOrder;
        $scope.currentUser = $rootScope.currentUser;










        function findAirlines(response, carrier){
            var array = response.appendix.airlines;
            for(var i in array){
                if(array[i].iata = carrier){
                    return array[i];
                }
            }
            return "Can not find the corresponding carrier."

        }






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
                    //console.log("abc");
                    //console.log(response);
                    //console.log("asdasdasdasasd");
                    //console.log(findAirlines(response, response.flightStatus.carrierFsCode));
                    $scope.airline = findAirlines(response, response.flightStatus.carrierFsCode);
                    $scope.flightDetails = response;
                    //console.log("mmmmmmmm"+response.flightStatus.departureAirportFsCode);
                    //console.log(calculateAirportOrder(response, response.flightStatus.departureAirportFsCode));
                    //console.log(calculateAirportOrder(response, response.flightStatus.arrivalAirportFsCode));

                    $scope.from = calculateAirportOrder(response, response.flightStatus.departureAirportFsCode);
                    $scope.to = calculateAirportOrder(response, response.flightStatus.arrivalAirportFsCode);
                }
            )




        }






        function like(){







        }




        //$(function() {
        //    $( ".autocomplete" ).autocomplete({
        //        source: function( request, response ) {
        //            $.ajax({
        //                url: "//www.air-port-codes.com/search/",
        //                jsonp: "callback",
        //                dataType: "jsonp",
        //                data: {
        //                    term: request.term, // input field value
        //                    limit: 7, // default is 30
        //                    size: 3, // default is 0
        //                    key: "[API-KEY-HERE]" // dont forget to add your API Key from your air-port-codes.com account
        //                },
        //                success: function( data ) {
        //                    if (data.status) { // success
        //                        response( $.map( data.airports, function( item ) {
        //                            return {
        //                                label: item.name + ' (' + item.iata + ')',
        //                                value: item.name + ' (' + item.iata + ')',
        //                                code: item.iata
        //                            }
        //                        }));
        //                    } else { // no results
        //                        response();
        //                    }
        //                }
        //            });
        //        },
        //        select: function( event, ui ) {
        //            // do something for click event
        //            console.log(ui.item.code);
        //        }
        //    });
        //});





        function search(flight){

            flightStatesService.searchFlightByAirport(flight).then(function(response){
                console.log(response);
                $scope.flights = response.flightStatuses;

                if(response.flightStatuses.length==0){
                    $scope.message = response.error.errorMessage;

                }else{
                    $scope.message = "Successfully search " + response.flightStatuses.length + " results for you";

                }


            })
        }

        //$scope.login =
        //    function(){
        //        UserService.findUserByUsernameAndPassword($scope.username, $scope.password, function(user){
        //            if(user !== null) {
        //                console.log("logged in");
        //                $rootScope.user = user;
        //                $location.url('/profile');
        //            }else{
        //                console.log("Can't find the user");
        //
        //            }
        //        })
        //    }



    }

})();