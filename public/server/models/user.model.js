/**
 * Created by zeqingzhang on 3/9/16.
 */
var mock = require("./user.mock.json");
module.exports = function() {
    var api = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        findUserById: findUserById,
        findUsersByIds: findUsersByIds,
        Update: Update
    };
    return api;




    function Update(id, updatedUser){
        for(var i = 0; i< mock.length; i++){
            //console.log(userData[i]._id == id);
            if(mock[i]._id == id){
                mock[i] = updatedUser;
                //console.log("The updated user should become "+ updatedUser);
                //console.log("After updating the user is :"+ userData[i]);
                return mock[i];
            }
        }
    }





    function findUsersByIds (userIds) {
        var users = [];
        for (var u in userIds) {
            var user = findUserById (userIds[u]);
            if (user) {
                users.push ({
                    username: user.username,
                    _id: user._id
                });
            }
        }
        return users;
    }

    function findUserById(userId) {
        for(var u in mock) {
            if( mock[u]._id === userId ) {
                return mock[u];
            }
        }
        return null;
    }

    function createUser(user) {
        user._id = "ID_" + (new Date()).getTime();
        mock.push(user);
        return user;
    }

    function findUserByCredentials(credentials) {
        console.log("Test findUserByCredentials");
        for(var u in mock) {
            console.log("credentials username is "+ credentials.username);
            if( mock[u].username === credentials.username &&
                mock[u].password === credentials.password) {
                return mock[u];
            }
        }
        return null;
    }
};