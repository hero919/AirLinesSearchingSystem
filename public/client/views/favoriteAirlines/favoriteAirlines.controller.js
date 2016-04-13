/**
 * Created by zeqingzhang on 3/8/16.
 */
(function(){
    'use strict';
    angular.
        module('airlines')
        .controller("favoriteAirlinesController",favoriteAirlinesController);




    function favoriteAirlinesController(tripService, $scope, $routeParams, flightStatesService, $location, $q){
        $scope.routeFlightId = $routeParams.flightId;
        $scope.hotelId = $routeParams.hotelId;
        $scope.checkInDate = $routeParams.checkInDate;
        $scope.checkOutDate = $routeParams.checkOutDate;
        $scope.checkEmpty = checkEmpty;
        $scope.cancelLikeFlight = cancelLikeFlight;
        $scope.cancelLikeHotel = cancelLikeHotel;



        //var coords = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
        var depatureAirportCoords = null;
        var hotelLocation = null;
        var airportLocation = null;
        var hotelLocationLatitude = null;
        var hotelLocationLongitude = null;
        var airportLatitude = null;
        var airportLongitude = null;

        function initialize(location){
            var mapOptions =
            {
                zoom: 14,
                center: depatureAirportCoords,
                mapTypeControl: false,
                navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
            var marker = new google.maps.Marker({
                position: depatureAirportCoords,
                map: map,
                title: "Departure Airport location!"
            });

        }

        function initHotelMap() {
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;
            var map = new google.maps.Map(document.getElementById('hotelLocationInfo'), {
                zoom: 7,
                center: {lat: 41.85, lng: -87.65}
            });
            directionsDisplay.setMap(map);
            //console.log("Hello Gap");
            calculateAndDisplayRoute(directionsService, directionsDisplay);
//        var onChangeHandler = function() {
//            calculateAndDisplayRoute(directionsService, directionsDisplay);
//        };
//        document.getElementById('start').addEventListener('change', onChangeHandler);
//        document.getElementById('end').addEventListener('change', onChangeHandler);
        }
        function calculateAndDisplayRoute(directionsService, directionsDisplay) {
           // console.log(document.getElementById('start').value);
            console.log("HotelInfo");
            console.log(hotelLocationLatitude);
            console.log(hotelLocationLongitude);
            console.log("FlightInfo");
            console.log(airportLatitude);
            console.log(airportLongitude);
            directionsService.route({
                origin: new google.maps.LatLng(hotelLocationLatitude, hotelLocationLongitude),
                destination: new google.maps.LatLng(airportLatitude, airportLongitude),
                travelMode: google.maps.TravelMode.DRIVING
            }, function(response, status) {
                //console.log(response);
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        }

        var arrivalAirportCoords = null;
        function initialize02(location) {
            var mapOptions =
            {
                zoom: 14,
                center: arrivalAirportCoords,
                mapTypeControl: false,
                navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map = new google.maps.Map(document.getElementById("map_canvas02"), mapOptions);
            var marker = new google.maps.Marker({
                position: arrivalAirportCoords,
                map: map,
                title: "Arrival Airport location!"
            });
        }





            function cancelLikeFlight(flightId){
            tripService.cancelLikeFlight(flightId);
            tripService.checkFavoriteFlight($routeParams.flightId).then(
                function(response){
                   if(!response.data){
                       $location.url("/favoriteAirlines");
                   }
                }
            );
            init();
        }


        function cancelLikeHotel(hotelId, checkInDate, checkOutDate){
            tripService.cancelLikeHotel(hotelId,checkInDate,checkOutDate);
            tripService.checkFavoriteHotel(hotelId,checkInDate,checkOutDate).then(
                function(response){
                    //console.log(response.data);
                    if(!response.data){
                        $location.url("/favoriteAirlines");
                    }
                });
            init();
        }

        function checkEmpty(array){
             if(array.length==0){
                 return false;
             }else{
                 return true;
             }
        }




        function init() {
            tripService.findUserLikeFlights().then(
                function(airlines){
                    $scope.check = checkEmpty(airlines.data);
                    $scope.airlines = airlines.data;
                    //console.log(airlines.data);
                }
            );

            tripService.findUserLikeHotels().then(
                function(hotels){
                    $scope.checkHotels = checkEmpty(hotels.data);
                    $scope.hotels = hotels.data;
                }
            );

            $scope.flightDetails = null;
            $scope.hotelDetails = null;
            if($routeParams.flightId) {
                flightStatesService.searchFlightById($routeParams.flightId).then(
                    function(flightDetails){
                        //console.log(flightDetails);
                        $scope.flightDetails = flightDetails;
                       if(flightDetails.flightStatus.departureAirportFsCode==flightDetails.appendix.airports[0].fs){
                           $scope.departureAirportInfo = flightDetails.appendix.airports[0];
                           $scope.arrivalAirportInfo = flightDetails.appendix.airports[1];
                           depatureAirportCoords = new google.maps.LatLng(flightDetails.appendix.airports[0].latitude, flightDetails.appendix.airports[0].longitude);
                           arrivalAirportCoords =  new google.maps.LatLng(flightDetails.appendix.airports[1].latitude, flightDetails.appendix.airports[1].longitude);
                       }else{
                           $scope.departureAirportInfo = flightDetails.appendix.airports[1];
                           $scope.arrivalAirportInfo = flightDetails.appendix.airports[0];
                           depatureAirportCoords = new google.maps.LatLng(flightDetails.appendix.airports[1].latitude, flightDetails.appendix.airports[1].longitude);
                           arrivalAirportCoords =  new google.maps.LatLng(flightDetails.appendix.airports[0].latitude, flightDetails.appendix.airports[0].longitude);
                       }
                        var i = 0;
                        while(flightDetails.appendix.airlines[i].fs !== flightDetails.flightStatus.carrierFsCode){
                            i++;
                        }
                        $scope.carrierInfo = flightDetails.appendix.airlines[i];
                        var codeShares = "";
                        for(var airlineCode in flightDetails.flightStatus.codeshares){

                            codeShares = codeShares + flightDetails.flightStatus.codeshares[airlineCode].fsCode + flightDetails.flightStatus.codeshares[airlineCode].flightNumber + "/ ";
                        }
                        codeShares = codeShares.substring(0, codeShares.length -2);
                        $scope.codeShares = codeShares;
                    }
                );
                navigator.geolocation.getCurrentPosition(initialize);
                navigator.geolocation.getCurrentPosition(initialize02);
            }



            if($routeParams.hotelId){

                var IATACode = $routeParams.hotelId.substring(2,5);
                flightStatesService.getAirportInfo(IATACode).then(function(response){
                    //console.log(response.airports[0]);
                    airportLatitude = response.airports[0].latitude;
                    airportLongitude = response.airports[0].longitude;
                    airportLocation = new google.maps.LatLng(airportLatitude, airportLongitude);
                    //console.log("LLLLLL");
                    //console.log(airportLongitude);

                });

                flightStatesService.searchHotelByIdAndDate($routeParams.hotelId,$routeParams.checkInDate, $routeParams.checkOutDate).then(
                    function(hotelDetails){
                        hotelLocation = new google.maps.LatLng(hotelDetails.data.location.latitude, hotelDetails.data.location.longitude);
                        hotelLocationLatitude = hotelDetails.data.location.latitude;
                        hotelLocationLongitude = hotelDetails.data.location.longitude;
                        //console.log(hotelDetails);
                        $scope.hotelDetails = hotelDetails;
                        $scope.amenities = hotelDetails.data.amenities;

                        console.log("yyyyyy");
                        console.log(hotelLocationLongitude);

                        //console.log(hotelDetails.data.rooms.length>0);
                        if(hotelDetails.data.rooms.length > 0) {
                            var length = hotelDetails.data.rooms[0].rates.length;
                            $scope.length = hotelDetails.data.rooms[length - 1];
                            var checkInDate = hotelDetails.data.rooms[0].rates[0].start_date;
                            var checkOutDate = hotelDetails.data.rooms[0].rates[length - 1].end_date;
                            $scope.checkInDate = checkInDate;
                            $scope.checkOutDate = checkOutDate;
                            //$scope.award = hotelDetails.data.awards;

                            var rooms = hotelDetails.data.rooms;
                            for (var i in rooms) {
                                if (rooms[i].total_amount.amount == hotelDetails.data.total_price.amount) {
                                    var cheapestRoom = rooms[i];
                                    $scope.cheapestRoom = rooms[i];
                                    $scope.desciptionsArray = cheapestRoom.descriptions;

                                }
                            }

                        }


                    }
                );

               setTimeout(function(){
                   initHotelMap();
               },1500);
            }



        }

        init();









    }

})();