/**
 * Created by zeqingzhang on 3/21/16.
 */
module.exports = function(mongoose, db) {
    var q = require('q');
    var hotelSchema = require("./hotel.schema.server")(mongoose);
    var hotelModel = mongoose.model('project.airlinessearchingsystem.hotelInfo',hotelSchema);
    var api = {
        findHotelsByUserId : findHotelsByUserId,
        addLikeHotelByUserId : addLikeHotelByUserId,
        cancelLikeHotel : cancelLikeHotel,
        checkFavoriteHotel : checkFavoriteHotel
    };

    return api;


    function checkFavoriteHotel(userId, hotelId, checkInDate, checkOutDate){

        console.log("++++++++");
        console.log(userId);
        console.log(hotelId);
        console.log(checkInDate);
        console.log(checkOutDate);
        var deferred = q.defer();
        hotelModel.findOne({
            userId : userId,
            property_code : hotelId,
            checkInDate: checkInDate,
            checkOutDate : checkOutDate
        }, function(err, hotel){
            if(err){
                console.log("Error");
                deferred.reject(err);
            }else{
                console.log(hotel);
                deferred.resolve(hotel)
            }
        });
        return deferred.promise;
    }





    function findHotelsByUserId(userId){
        var deferred = q.defer();
        hotelModel.find({
            userId : userId
        }, function(err,hotels){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(hotels);
            }

        });
        return deferred.promise;
    }

    function addLikeHotelByUserId(userId,checkInDate, checkOutDate, hotel){
        var deferred = q.defer();
        var totalPrice = hotel.total_price.amount + " " + hotel.total_price.currency;
        var address = hotel.address.line1 + " ," + hotel.address.city + " ," +
                hotel.address.region + " ," + hotel.address.country;
        var contactsArray = [];
        for(var i in hotel.contacts) {
            contactsArray.push(hotel.contacts);
        }

        hotelModel.create({
            property_code : hotel.property_code,
            property_name : hotel.property_name,
            userId : userId,
            price : totalPrice,
            checkInDate : checkInDate,
            checkOutDate : checkOutDate,
            address : address,
            contacts : contactsArray
        },function(err, hotel){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(hotel);
            }
        });
        return deferred.promise;

    }

    function cancelLikeHotel(userId, property_code, checkInDate, checkOutDate){

        var deferred = q.defer();
        hotelModel.remove({
            userId : userId,
            property_code : property_code,
            checkInDate : checkInDate,
            checkOutDate : checkOutDate
        }, function(err, stats){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(stats);
            }
        });
        return deferred.promise;

    }


};