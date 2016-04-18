/**
 * Created by zeqingzhang on 4/17/16.
 */
var GoogleCallBackURL = "http://airlinessearchingsystem-zeqingzhang.rhcloud.com/auth/google/callback" || "http://127.0.0.1:3000/auth/google/callback";
module.exports = {
  'facebookAuth' : {
      'clientID'        : "1179261958765026",
      'clientSecret'    : "c8016dee50452fc86ef9f76738f7a2da",
      'callbackURL'     : "http://airlinessearchingsystem-zeqingzhang.rhcloud.com/auth/facebook/callback"
  },
    'googleAuth' : {
        'clientID'        : "1060475494658-r67rnsg9hcdvuo2r0c6nhuojs74ube2v.apps.googleusercontent.com",
        'clientSecret'    : "_Ds3xftvFRlsgUQEnIwrEUMK",
        'callbackURL'     : GoogleCallBackURL
        //"http://127.0.0.1:3000/auth/google/callback"
    },
    'flightStates' : {

    }
};