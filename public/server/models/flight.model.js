/**
 * Created by zeqingzhang on 3/9/16.
 */

var q = require('q');
module.exports = function(mongoose, db) {

    var flightSchema = require('./flight.schema.server.js')(mongoose);
    //console.log(flightSchema);
    var flightModel = mongoose.model('project.airlinessearchingsystem.flightInfo', flightSchema);


    var api = {
        //findFlightByFlightId : findFlightByFlightId,
        findFlightsByUserId : findFlightsByUserId,
        addLikeFlightByUserId : addLikeFlightByUserId,
        //deleteLikeFlightByFlightId : deleteLikeFlightByFlightId,
        checkFavoriteFlight : checkFavoriteFlight,
        cancelLikeFlight : cancelLikeFlight
       // getFlightDetail : getFlightDetail
    };

    return api;




    function cancelLikeFlight(userId, flightId){
        var deferred = q.defer();
        flightModel.remove({
            userId : userId,
            flightId : flightId
        }, function(err,stats){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(stats);
            }
        });
        return deferred.promise;
    }
//mongoose.Types.ObjectId(id)

    function checkFavoriteFlight(userId, flightId){
        var deferred = q.defer();
        flightModel.findOne({
            userId : userId,
            flightId : flightId
        }, function(err, doc){
            if(err){
                //console.log("Have Error");
                //console.log(err);
                deferred.reject(err);
            }else{
                //console.log("Doc");
                //console.log(doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;

    }






    function findFlightsByUserId(userId){

        var deferred = q.defer();

        flightModel.find({
            userId : userId
        }, function(err, flights){
            if(err){
                //console.log("errorrrrr");
                deferred.reject(err);
            }else{
                //console.log("findAllFlights");
                //console.log(flights);
                deferred.resolve(flights);
            }
        });
        return deferred.promise;

    }


    //    userId : String,
    //    flightFrom : String,
    //    flightTo: String,
   //     date: String
    //    details: String
    function addLikeFlightByUserId(userId, flight){
        var deferred = q.defer();
        var airlineNumber = flight.carrierFsCode + flight.flightNumber;
        flightModel.create({
            userId: userId,
            flightId : flight.flightId,
            flightFrom : flight.departureAirportFsCode,
            flightTo: flight.arrivalAirportFsCode,
            departTime: flight.departureDate.dateLocal,
            arrivalTime: flight.arrivalDate.dateLocal,
            airlineNumber : airlineNumber
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