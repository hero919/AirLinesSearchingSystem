/**
 * Created by zeqingzhang on 4/10/16.
 */
module.exports = function(mongoose){
    var contactSchema = mongoose.Schema({
        name : String,
        email : String,
        phone : String,
        message : String
    }, {
        collection : 'project.airlinessearchingsystem.contactInfo'
    });

    return contactSchema;



};