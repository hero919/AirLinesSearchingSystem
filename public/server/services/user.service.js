/**
 * Created by zeqingzhang on 3/9/16.
 */

module.exports = function(app, userModel){

    app.post("/api/project/airlines/login", login);
    app.get("/api/project/airlines/loggedin", loggedin);
    app.post("/api/project/airlines/logout", logout);
    app.post("/api/project/airlines/register", register);
    app.put("/api/project/airlines/setCurrentUser", setCurrentUser);


    function setCurrentUser(req,res){
        req.session.currentUser = req.body;
        res.json(req.session.currentUser);

    }

    function register(req, res) {
        var user = req.body;
        userModel.createUser(user).then(function(response){
            req.session.currentUser = response;
            res.json(response);
        });



    }

    function login(req, res) {
        var credentials = req.body;
       //return userModel.findUserByCredentials(credentials);
        userModel.findUserByCredentials(credentials).then(function(findUser){
            req.session.currentUser = findUser;
            res.json(findUser);
        });

    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }



    app.put('/api/project/airlines/user/:id', function(req,res){
        userModel.Update(req.params.id, req.body).then(function(updatedUser){
            res.json(updatedUser);
        })
    });



};