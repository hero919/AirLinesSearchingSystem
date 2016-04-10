/**
 * Created by zeqingzhang on 4/10/16.
 */
var q = require('q');
module.exports = function(mongoose, db) {

    var contactSchema = require('./contact.schema.server.js')(mongoose);
    //console.log(flightSchema);
    var contactModel = mongoose.model('project.airlinessearchingsystem.contactInfo', contactSchema);


    var api = {
        addContactInfo : addContactInfo
    };

    return api;


    function addContactInfo(form){
        var deferred = q.defer();
        contactModel.create({
            name: form.name,
            email:form.email,
            phone:form.phone,
            message : form.message
        }, function(err, doc){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }

        });
        return deferred.promise;
    }





};