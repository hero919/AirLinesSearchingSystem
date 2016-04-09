/**
 * Created by zeqingzhang on 3/9/16.
 */
module.exports = function(app,mongoose, db){
    //console.log(app);
    var UserModel = require('./models/user.model.js')(mongoose, db);
    var FlightModel = require('./models/flight.model.js')(mongoose, db);
    var HotelModel = require('./models/hotel.model.js')(mongoose,db);
    require('./services/user.service.js')(app,UserModel);
    require('./services/trip.service.js')(app,UserModel, FlightModel, HotelModel);
   // require('./services/flight.service.js')(app, UserModel, FlightModel);

};