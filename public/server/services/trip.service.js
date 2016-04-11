/**
 * Created by zeqingzhang on 3/9/16.
 */
module.exports = function(app, userModel, flightModel, hotelModel,contactModel){

    var q = require("q");
    var sendgrid = require("sendgrid")("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");


    app.post("/api/project/airlines/contact", addContact);

    app.get("/api/project/airlines/:userId/checkFlight/:flightId", checkFavoriteFlight);

    app.get("/api/project/airlines/:userId/checkHotel/:hotelId/:checkInDate/:checkOutDate", checkFavoriteHotel);


    //User press save button to save the favorite flight to the database
    app.post("/api/project/airlines/:userId/flight", userLikeFlight);

    //User press save button to save the favorite flight to the database
    app.post("/api/project/airlines/:userId/hotel/:checkInDate/:checkOutDate", userLikeHotel);

    //User press delete to delete the favorite flight from the database
    app.delete("/api/project/airlines/:userId/deleteFlight/:flightId", cancelLikeFlight);


    //User press delete to delete the favorite hotel from the database
    app.delete("/api/project/airlines/:userId/deleteHotel/:hotelId/:checkInDate/:checkOutDate", cancelLikeHotel);


    ////Find the flight detail information
    //app.get("/api/project/airlines/:userId/flight/:flightId", getFlightDetail);
    //
    //
    ////Find the hotel detail information
    //app.get("/api/project/airlines/:userId/hotel/:hotelId", getHotelDetail);


    //Find all the flights this user like
    app.get("/api/project/airlines/:userId/flights", getUserLikeFlights);


    //Find all the hotels this user like
    app.get("/api/project/airlines/:userId/hotels", getUserLikeHotels);




    function addContact(req,res){
        var form = req.body;
        var email = new sendgrid.Email();
        if(req.session.currentUser){
            var currentUser = req.session.currentUser;
            email.addTo("zhang.ze@husky.neu.edu");
            email.setFrom("TripSearching");
            email.setSubject("Sending from existing user: " + currentUser.username);
            email.setHtml("<h1>The client Message is: "+ form.message + "<h2>The client Name is: " + form.name + "<h2>The client Phone Number is: " + form.phone + "<h2>The client Email is:" + form.email);
            sendgrid.send(email);
        }else{
            email.addTo("zhang.ze@husky.neu.edu");
            email.setFrom("TripSearching");
            email.setSubject("Sending from Anonymous");
            email.setHtml("<h1>The client Message is: "+ form.message + "<h2>The client Name is: " + form.name + "<h2>The client Phone Number is: " + form.phone + "<h2>The client Email is:" + form.email);
            sendgrid.send(email);
        }

        
        contactModel.addContactInfo(form).then(
            function(doc){
            res.json(doc)
        },
            function(err){
                res.status(400).send(err);
            }
        )
    }





    function checkFavoriteFlight(req,res){
        //console.log("($)");
        var userId = req.params.userId;
        var flightId = req.params.flightId;
        flightModel.checkFavoriteFlight(userId, flightId).then(
            function(response){
                if(response == null) {
                    res.json(false);
                }else{
                    res.json(true);
                }

        }, function(err){
                //console.log("ERROR");
                //console.log(err);
                res.status(400).send(err);
            }


        )

    }

    function checkFavoriteHotel(req,res){
        var userId = req.params.userId;
        var hotelId = req.params.hotelId;
        var checkInDate = req.params.checkInDate;
        var checkOutDate = req.params.checkOutDate;
        hotelModel.checkFavoriteHotel(userId, hotelId,checkInDate,checkOutDate).then(
            function(hotel){
               // console.log("The response of checkFavorite is: ");
               // console.log(hotel);
                if(hotel == null){
                    res.json(false);
                }else {
                    res.json(true);
                }
            },
            function(err){
                res.status(400).send(err);
            }
        )
    }



    function userLikeFlight(req,res){
        var userId = req.params.userId;
        var flight = req.body;
        flightModel.addLikeFlightByUserId(userId, flight).then
        (
            function(doc){
                //console.log(doc);
                res.json(doc);
            }
            ,
            function(error){
                //console.log("err");
                //console.log(err);
                res.status(400).send(error);
            }
        )

    }


    function userLikeHotel(req,res){
        var userId = req.params.userId;
        var checkInDate = req.params.checkInDate;
        var checkOutDate = req.params.checkOutDate;
        var hotel = req.body;
        hotelModel.addLikeHotelByUserId(userId,checkInDate,checkOutDate, hotel).then(
            function(doc){
                res.json(doc);
            },function(err){
                res.status(400).send(err);
            }
        );
    }


    function  cancelLikeFlight(req,res){
        var userId = req.params.userId;
        var flightId = req.params.flightId;
        flightModel.cancelLikeFlight(userId, flightId).then(
            function(doc){
                res.status(200).send("Success");
            },
            function(err){
                res.status(400).send(err);
            }
        )

    }

    function cancelLikeHotel(req,res){
        var userId = req.params.userId;
        var hotelId = req.params.hotelId;
        var checkInDate = req.params.checkInDate;
        var checkOutDate = req.params.checkOutDate;
        hotelModel.cancelLikeHotel(userId,hotelId,checkInDate,checkOutDate).then(
            function(doc){
                res.status(200).send("Success");
            },
            function(err){
                res.status(400).send(err);
            }
        )
    }


    function getFlightDetail(req,res){
       flightModel.getFlightDetail(req.params.userId, req.params.flightId).then(function(response){
           res.json(response);
       })




    }

    function getUserLikeFlights(req, res){
        //console.log("CALL GETUSERLIKEFLIGHTS FUNCTION");
        var userId = req.params.userId;
        //console.log(flightModel.findFlightsByUserId(userId));
        flightModel.findFlightsByUserId(userId).then(
            function(flights){
                res.json(flights);
            }
        )
    }



    function getUserLikeHotels(req, res){
        var userId = req.params.userId;
        hotelModel.findHotelsByUserId(userId).then(
            function(hotels){
                res.json(hotels);
            },
            function(err){
                res.status(400).send(err);
            }
        )
    }







};