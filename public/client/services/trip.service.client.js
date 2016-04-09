/**
 * Created by zeqingzhang on 3/9/16.
 */
(function(){
    angular
        .module('airlines')
        .factory("tripService", tripService);


    function tripService($http, $rootScope){

        var api = {
            userLikeFlight: userLikeFlight,
            userLikeHotel: userLikeHotel,
            findUserLikeHotels: findUserLikeHotels,
            findUserLikeFlights : findUserLikeFlights,
            checkFavoriteFlight : checkFavoriteFlight,
            checkFavoriteHotel : checkFavoriteHotel,
            cancelLikeFlight : cancelLikeFlight,
            cancelLikeHotel : cancelLikeHotel,
            getFavoriteFlightDetails : getFavoriteFlightDetails
        };


        return api;


        //Search from the flight database



        function cancelLikeHotel(hotelId, checkInDate, checkOutDate){
            var userId = $rootScope.currentUser._id;
            return $http.delete("/api/project/airlines/" + userId + "/deleteHotel/" +
                hotelId +
                "/" +
                checkInDate +
                "/" +
                checkOutDate);

        }



        function checkFavoriteHotel(hotelId, checkInDate, checkOutDate){
            console.log("Hello");
            var userId = $rootScope.currentUser._id;
            return $http.get("/api/project/airlines/"+
                userId +
                "/checkHotel/" +
                hotelId +
                "/" +
                checkInDate +
                "/" +
                checkOutDate);
        }





        function getFavoriteFlightDetails(flightId){
            var userId = $rootScope.currentUser._id;
            return $http.get("/api/project/airlines/" + userId + "/flight/" + flightId);
        }


        function cancelLikeFlight(flightId){
            var userId = $rootScope.currentUser._id;
            return $http.delete("/api/project/airlines/" + userId + "/deleteFlight/" + flightId)
        }



        function checkFavoriteFlight(flightId){
            var userId = $rootScope.currentUser._id;
      //      console.log(userId);
            return $http.get("/api/project/airlines/" + userId + "/checkFlight/" +  flightId);
        }



        function userLikeFlight(flight){
            var userId = $rootScope.currentUser._id;
            return $http.post("/api/project/airlines/" + userId + "/flight", flight);
        }


        function userLikeHotel(hotel, checkInDate, checkOutDate){
            var userId = $rootScope.currentUser._id;
            return $http.post("/api/project/airlines/"+ userId + "/hotel/"+ checkInDate + "/" + checkOutDate, hotel);
        }

        function findUserLikeFlights(){
            var userId = $rootScope.currentUser._id;
            return $http.get("/api/project/airlines/" + userId + "/flights");

        }

        function findUserLikeHotels(){
            var userId = $rootScope.currentUser._id;
            return $http.get("/api/project/airlines/" + userId + "/hotels");
        }


    }

})();