/**
 * Created by zeqingzhang on 3/27/16.
 */
module.exports = function(mongoose){
  var hotelSchema = mongoose.Schema({
      property_code: String,
      property_name : String,
      userId: String,
      price : String,
      checkInDate : String,
      checkOutDate : String,
      address : String,
      contacts : [String]
  }, {
      collection : 'project.airlinessearchingsystem.hotelInfo'
  });

return hotelSchema;





};