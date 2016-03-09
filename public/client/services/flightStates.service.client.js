/**
 * Created by zeqingzhang on 3/9/16.
 */
(function(){
    angular
        .module("airlines")
        .factory("flightStatesService", flightStatesService);

    function flightStatesService($http) {
        var api = {
            searchFlightByAirport: searchFlightByAirport,
            //searchMovieByTitle: searchMovieByTitle,
            findMovieByImdbID: findMovieByImdbID
        };
        return api;

        function searchFlightByAirport(departureAirport,arrivalAirport, year, month, day, maxFlights) {
            var appId = "2cb99f9b";
            var appKey = "e76c96dd3b766b615229c03c38872bf3&hourOf";

            return $http
                .get("https://api.flightstats.com/flex/flightstatus/rest/v2/json/route/status/" +
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
                "maxFlights=" + maxFlights);
        }

        function searchMovieByTitle(title) {
            return $http.get("http://www.omdbapi.com/?s="+title);
        }
    }
})();