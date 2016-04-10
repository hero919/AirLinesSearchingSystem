/**
 * Created by zeqingzhang on 3/7/16.
 */
(function(){
    angular
        .module("airlines")
        .controller("MainpageController",MainpageController);


    function MainpageController($scope, tripService){


        $scope.submit = submit;

        function submit(form){
            tripService.addContact(form);
            alert("Form has already successfully submitted.");
            $scope.contact = null;
        }




    }






})();



