/**
 * Created by zeqingzhang on 3/9/16.
 */

module.exports = function(app, userModel, flightModel){

    app.post("/api/project/airlines/login", login);
    app.get("/api/project/airlines/loggedin", loggedin);
    app.post("/api/project/airlines/logout", logout);
    app.post("/api/project/airlines/register", register);
    //app.get("/api/project/airlines/profile/:userId", profile);
    //
    //function profile(req, res) {
    //    var userId = req.params.userId;
    //    var user = userModel.findUserById(userId);
    //    var movieImdbIDs = user.likes;
    //    var movies = movieModel.findMoviesByImdbIDs(movieImdbIDs);
    //    user.likesMovies = movies;
    //    res.json(user);
    //}

    function register(req, res) {
        var user = req.body;
        user = userModel.createUser(user);
        req.session.currentUser = user;
        console.log("asdasdsad");
        console.log(user);
        res.json(user);
    }

    function login(req, res) {

        var credentials = req.body;
        console.log("The server side credential is: "+ credentials);
        var user = userModel.findUserByCredentials(credentials);
        console.log("The server side user is: "+ user);
        req.session.currentUser = user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }


//'/api/project/airlines/user/'

    app.put('/api/project/airlines/user/:id', function(req,res){
        //model.Update(req.params.id, req.body).then(function(user) {
        //    res.json(user);
        //});

        console.log("The request body is "+ req.body);
        res.json(userModel.Update(req.params.id, req.body));
    });



};