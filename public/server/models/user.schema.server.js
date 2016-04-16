/**
 * Created by zeqingzhang on 3/27/16.
 */
/**
 * Created by zeqingzhang on 3/24/16.
 */
module.exports = function(mongoose){
    var userSchema =  mongoose.Schema({
        username : String,
        password : String,
        firstName: String,
        lastName : String,
        company : String,
        role: String,
        emails : String,
        google:   {
            id:    String,
            token: String
        },
        facebook:   {
            id:    String,
            token: String
        }
    }, {
        collection : 'project.airlinessearchingsystem.userInfo'
    });

    return userSchema;
};