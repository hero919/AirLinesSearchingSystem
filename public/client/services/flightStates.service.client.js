/**
 * Created by zeqingzhang on 3/9/16.
 */
(function () {
    angular
        .module("airlines")
        .factory("flightStatesService", flightStatesService);

    function flightStatesService($http, $q) {
        var appId = "0e4ee6a1";
        var appKey = "48839aed04276ba8ed3556159422686d";
        var api = {
            searchFlightByAirport: searchFlightByAirport,
            searchFlightById: searchFlightById,
            searchHotelByLocation: searchHotelByLocation
            //searchMovieByTitle: searchMovieByTitle,
            //findMovieByImdbID: findMovieByImdbID
        };
        return api;


        function searchHotelByLocation(hotel) {

            var convert = "http://json2jsonp.com/?url=";
            var deferred = $q.defer();
            var apiKey = "yHpnDMZo7eixGRwzE5hitP9KhxMFU8zb";
            var location = hotel.location;
            var checkInDate = hotel.checkIn;
            var checkOutDate = hotel.checkOut;
            var radius = hotel.radius;
            var maxHotels = hotel.maxHotels;
            var URL = "https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey=" +
                apiKey +
                "&location=" +
                location +
                "&check_in=" +
                checkInDate +
                "&check_out=" +
                checkOutDate +
                "&radius=" +
                radius +
                "&number_of_results=" +
                maxHotels;

            console.log(URL);
            return $http.get(URL);
            //    .success(function (response) {
            //        //console.log(response);
            //        deferred.resolve(response);
            //    });
            //
            //return deferred.promise;
        }

        function searchFlightById(flightId) {

            var deferred = $q.defer();
            var URL = "https://api.flightstats.com/flex/flightstatus/rest/v2/jsonp/flight/status/" +
                flightId +
                "?appId=" +
                appId +
                "&appKey=" +
                appKey + "&&callback=JSON_CALLBACK";

            console.log("The URL is ");
            console.log(URL);
            $http.jsonp(URL)
                .success(function (response) {
                    console.log(response);
                    deferred.resolve(response);
                });

            return deferred.promise;

        }


        function searchFlightByAirport(flight) {

            var deferred = $q.defer();

            var departureAirport = flight.from;
            var arrivalAirport = flight.to;
            var year = flight.year;
            var month = flight.month;
            var day = flight.day;
            var maxFlights = flight.maxFlights;
            //var appId = "2cb99f9b";
            //var appKey = "e76c96dd3b766b615229c03c38872bf3&hourOf";

            var URL = "https://api.flightstats.com/flex/flightstatus/rest/v2/jsonp/route/status/" +
                departureAirport +
                "/" + arrivalAirport +
                "/dep" +
                "/" + year +
                "/" + month +
                "/" + day +
                "?appId=" +
                appId +
                "&appKey=" +
                appKey +
                "&hourOfDay=0&utc=false&numHours=24&" +
                "maxFlights=" + maxFlights + "&&callback=JSON_CALLBACK";


            $http.jsonp(URL)
                .success(function (response) {
                    deferred.resolve(response);
                });

            return deferred.promise;


            //$.ajax({
            //        url: URL,
            //        dataType:"jsonp",
            //        success: renderResult
            //    }
            //);
            //
            //var result = null;
            //
            //function renderResult(response){
            //    //console.log(response);
            //    result = response;
            //}
            //
            //
            //
            //return result;


            //return $http
            //    .get("https://api.flightstats.com/flex/flightstatus/rest/v2/json/route/status/" +
            //    departureAirport +
            //    "/" + arrivalAirport +
            //    "/dep" +
            //    "/" + year +
            //    "/" + month +
            //    "/" + day +
            //    "?appId=" +
            //    appId +
            //    "&appKey=" +
            //    appKey +
            //    "&hourOfDay=0&utc=false&numHours=24&" +
            //    "maxFlights=" + maxFlights + "?callback=JSON_CALLBACK").success(function(data,status, headers, config){
            //        console.log(data);
            //    });
        }

        //function searchMovieByTitle(title) {
        //    return $http.get("http://www.omdbapi.com/?s="+title);
        //}
    }
})();