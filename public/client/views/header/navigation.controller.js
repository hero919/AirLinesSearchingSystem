/**
 * Created by zeqingzhang on 3/7/16.
 */
(function(){
    angular
        .module("airlines")
        .controller("NavigationController", navigationController);

    function navigationController(UserService,$location) {
        var vm = this;

        vm.logout = logout;

        function init() {
            vm.$location = $location;
        }
        init();

        function logout() {
            UserService
                .logout()
                .then(function(){
                    UserService.setCurrentUser(null);
                    $location.url("/mainpage");
                });
        }
    }
})();