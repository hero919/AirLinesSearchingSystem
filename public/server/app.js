/**
 * Created by zeqingzhang on 3/9/16.
 */
module.exports = function(app){
    //console.log(app);
    var UserModel = require('./models/user.model.js')();
    var FlightModel = require('./models/flight.model.js')();
    require('./services/user.service.js')(app,UserModel,FlightModel);
   // require('./services/flight.service.js')(app, UserModel, FlightModel);

};