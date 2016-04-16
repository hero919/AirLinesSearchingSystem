/**
 * Created by zeqingzhang on 3/7/16.
 */
(function(){
    angular
        .module("airlines")
        .controller("LoginController", loginController);


    function loginController(UserService, $location, $scope) {
        //console.log("Test Login");
       // var vm = this;

        $scope.login = login;

        function init() {
        }
        init();

        function login(user) {
            //console.log(user);
            if(!user) {
                return;
            }

            UserService
                .login({
                    username: user.username,
                    password: user.password
                })
                .then(function(response){

                    //console.log(response);
                    if(response !==null) {
                        //console.log("successful");
                        console.log(response);
                        //UserService.setCurrentUser(response);
                        $location.url("/profile");
                    }else{
                        $scope.message = "The Username or Password is not correct";
                    }
                });
        }
    }

    //function loginController(UserService, $location) {
    //    console.log("Test Login");
    //    var vm = this;
    //
    //    vm.login = login;
    //
    //    function init() {
    //    }
    //    init();
    //
    //    function login(user) {
    //        console.log(user);
    //        if(!user) {
    //            return;
    //        }
    //        UserService
    //            .login({
    //                username: user.username,
    //                password: user.password
    //            })
    //            .then(function(response){
    //                if(response.data) {
    //                    UserService.setCurrentUser(response.data);
    //                    $location.url("/profile");
    //                }
    //            });
    //    }
    //}
})();