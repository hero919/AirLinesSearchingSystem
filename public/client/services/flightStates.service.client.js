/**
 * Created by zeqingzhang on 3/9/16.
 */
(function () {
    angular
        .module("airlines")
        .factory("flightStatesService", flightStatesService);

    function flightStatesService($http,$q) {
        var api = {
            searchFlightByAirport: searchFlightByAirport
            //searchMovieByTitle: searchMovieByTitle,
            //findMovieByImdbID: findMovieByImdbID
        };
        return api;

        function searchFlightByAirport(flight) {

            var deferred = $q.defer();



            var departureAirport = flight.from;
            var arrivalAirport = flight.to;
            var year = flight.year;
            var month = flight.month;
            var day = flight.day;
            var maxFlights = flight.maxFlights;
            var appId = "2cb99f9b";
            var appKey = "e76c96dd3b766b615229c03c38872bf3&hourOf";

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
            "maxFlights=" + maxFlights+"&&callback=JSON_CALLBACK";



            $http.jsonp(URL)
                .success(function(response){
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