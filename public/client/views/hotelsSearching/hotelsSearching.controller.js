/**
 * Created by zeqingzhang on 3/11/16.
 */
(function(){
    'use strict';
    angular.
        module('airlines')
        .controller("hotelsSearchingController",hotelsSearchingController);


    function hotelsSearchingController($scope,$location,$routeParams, $rootScope, flightStatesService,tripService){
        //$scope.hello = "hello World";
        $scope.searchHotels = searchHotels;
        $scope.getHotelDetails = getHotelDetails;
        $scope.like = like;
        $scope.cancelLikeFlight = cancelLikeFlight;
        $scope.checkObjectInArray = checkObjectInArray;




        function init(){
            if($routeParams.location != null){
                var hotel = {
                    location :$routeParams.location,
                    checkIn : $routeParams.checkInDate,
                    checkOut :$routeParams.checkOutDate,
                    radius : $routeParams.radius,
                    maxHotels : $routeParams.maxHotels
                };
                $scope.SearchHotel = hotel;
                flightStatesService.searchHotelByLocation(hotel).then(function(response){
                    $scope.findHotels = response.data.results;
                    if(response.data.results.length==0){
                        $scope.message = "Please enter the valid check in or check out date";

                    }else{
                        $scope.message = "Successfully search " + response.data.results.length + " results for you";
                    }
            })
            }


        }
        init();


        function checkObjectInArray(hotel){
            var likeHotels = getAllUserLikes();
            for(var i in likeHotels){
                if((likeHotels[i].property_code == hotel.property_code)&&
                    (likeHotels[i].checkInDate == hotel.rooms[0].rates[0].start_date)
                &&(likeHotels[i].checkInDate == hotel.rooms[0].rates[hotel.rooms[0].rates.length -1].start_date)){
                    return true;
                }
            }
            return false;
        }

        function cancelLikeFlight(hotelId, checkInDate, checkOutDate){
            tripService.cancelLikeHotel(hotelId,checkInDate,checkOutDate);
            getAllUserLikes();
        };


        function getAllUserLikes(){
            var userLikeHotelsArray = [];
            tripService.findUserLikeHotels().then(
                function(hotels){

                    var userLikeHotels = [];
                    for(var i in hotels.data){
                        var component = {
                            property_code :   hotels.data[i].property_code,
                            checkInDate : hotels.data[i].checkInDate,
                            checkOutDate : hotels.data[i].checkOutDate
                        };

                        userLikeHotelsArray.push(component);
                        userLikeHotels.push(hotels.data[i].property_code);
                    }
                    $scope.userLikeHotelsArray = userLikeHotelsArray;
                    $scope.userLikeHotels = userLikeHotels;
                }
            );
            return userLikeHotelsArray;
        }
        if($rootScope.currentUser){
            getAllUserLikes();
        }


        function like(hotel){
            tripService.userLikeHotel(hotel,$routeParams.checkInDate, $routeParams.checkOutDate);
            getAllUserLikes();
        }



        function getHotelDetails(hotel){
            $scope.hotelName = hotel.property_name;
            if(hotel.length > 0){
                $scope.contactDetail = hotel.contacts[0].detail
            }else{
                $scope.contactDetail = null;
            }

            $scope.address = hotel.address.line1 + ", "+ hotel.address.city + " ,"
                + hotel.address.region;
            if(hotel.rooms.length > 0) {
                $scope.descriptionArray = hotel.rooms[0].descriptions;
                $scope.room_type_info = hotel.rooms[0].room_type_info;
            }
            
            $scope.marketing_text = hotel.marketing_text;
            $scope.awardArray = hotel.awards;
        }

        //function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
        //    var R = 6371; // Radius of the earth in km
        //    var dLat = deg2rad(lat2-lat1);  // deg2rad below
        //    var dLon = deg2rad(lon2-lon1);
        //    var a =
        //            Math.sin(dLat/2) * Math.sin(dLat/2) +
        //            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        //            Math.sin(dLon/2) * Math.sin(dLon/2)
        //        ;
        //    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        //    var d = R * c; // Distance in km
        //    return d;
        //}
        //
        //function deg2rad(deg) {
        //    return deg * (Math.PI/180)
        //}


        function searchHotels(hotel){

            $location.url(
                '/hotelSearch/location/' +
                hotel.location +
                '/checkInDate/' +
                hotel.checkIn +
                '/checkOutDate/' +
                hotel.checkOut +
                '/radius/' +
                hotel.radius +
                '/maxHotels/' +
                hotel.maxHotels);
        }
        
    }

})();