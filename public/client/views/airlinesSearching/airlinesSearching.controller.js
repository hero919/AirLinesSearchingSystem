/**
 * Created by zeqingzhang on 3/8/16.
 */
(function(){
    'use strict';
    angular.
        module('airlines')
        .controller("airlinesSearchingController",airlinesSearchingController);


    //UserService, $rootScope, $location,$scope

    function airlinesSearchingController($scope, flightStatesService){




        $scope.search = search;


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