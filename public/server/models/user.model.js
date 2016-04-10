/**
 * Created by zeqingzhang on 3/9/16.
 */
//var mock = require("./user.mock.json");

var q = require("q");

module.exports = function(mongoose, db) {

    var userSchema = require('./user.schema.server.js')(mongoose);


    var userModel = mongoose.model('user',userSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        findUserById: findUserById,
        findUsersByIds: findUsersByIds,
        Update: Update
    };
    return api;

    function Update(id, updatedUser) {
        //for(var i = 0; i< mock.length; i++){
        //    //console.log(userData[i]._id == id);
        //    if(mock[i]._id == id){
        //        mock[i] = updatedUser;
        //        //console.log("The updated user should become "+ updatedUser);
        //        //console.log("After updating the user is :"+ userData[i]);
        //        return mock[i];
        //    }
        //}
        var deferred = q.defer();
        userModel.find({username: updatedUser.username}, function (err, doc) {
            if (err) {
                //console.log(err);
                deferred.reject(err);
            } else {
                //console.log("Update");
                    userModel
                        .update(
                        {_id: mongoose.Types.ObjectId(id)},
                        {$set: updatedUser},
                        function (err, stats) {
                            if (!err) {
                                //console.log("Not Error");
                                //console.log(userModel.findById({
                                //    _id: id
                                //}));
                                deferred.resolve(userModel.findById({
                                    _id: id
                                }));

                            } else {
                                //console.log(err);
                                deferred.reject(err);
                            }
                        }
                    );
            }
        });
        return deferred.promise;
    }





    function findUsersByIds (userIds) {

        var deferred = q.defer();

        // find all users in array of user IDs
        userModel.find({
            _id: {$in: userIds}
        }, function (err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });

        return deferred.promise;
    }




    function findUserById(userId) {
        var deferred = q.defer();
        userModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function createUser(user) {
        //user._id = "ID_" + (new Date()).getTime();
        //mock.push(user);
        //return user;
        // use q to defer the response
        var deferred = q.defer();
        userModel.find({username: user.username}, function(err,doc){
           if(err){
               deferred.reject(err);
           }else{
               //console.log(doc.length);
               if(doc.length ==0){
                   userModel.create(user, function (err, doc) {
                       if (err) {
                           // reject promise if error
                           deferred.reject(err);
                       } else {
                           // resolve promise
                           deferred.resolve(doc);
                       }
               })
           }else{
                   deferred.resolve(false);
               }
        }
        // insert new user with mongoose user model's create()


        });

        // return a promise
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {

        var deferred = q.defer();
        userModel.findOne(
            // first argument is predicate
            { username: credentials.username,
                password: credentials.password },

            // doc is unique instance matches predicate
            function(err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;

    }
};