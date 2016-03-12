/**
 * Created by zeqingzhang on 3/11/16.
 */
(function(){
    'use strict';
    angular.
        module('airlines')
        .controller("hotelsSearchingController",hotelsSearchingController);


    function hotelsSearchingController($scope, flightStatesService){
        $scope.hello = "hello World";
        $scope.searchHotels = searchHotels;
       // $scope.findHotels = "asd";





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

            //console.log(flightStatesService.searchHotelByLocation(hotel).value);
            flightStatesService.searchHotelByLocation(hotel).then(function(response){
                console.log(response.data.results);
                $scope.findHotels = response.data.results;
                //if(response.results.length==0){
                //    $scope.message = "error";
                //
                //}else{
                //    $scope.message = "Successfully search " + response.results.length + " results for you";
                //
                //}

            });

        }


    }

})();