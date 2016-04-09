/**
 * Created by zeqingzhang on 3/27/16.
 */
module.exports = function(mongoose){
    var flightSchema = mongoose.Schema({
        userId : String,
        flightId: String,
        flightFrom : String,
        flightTo: String,
        departTime: String,
        arrivalTime: String,
        airlineNumber : String
        //details: Schema.Types.Mixed
    }, {
        collection : 'project.airlinessearchingsystem.flightInfo'
    });
    return flightSchema;
};