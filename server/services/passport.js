const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Set up options for JWT Strategy
const jwtOptions = {};

//Create JWT Strategy
//payload = decoded Jwt token
//"done" is a callback
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user ID in the payload exists in our database
  //If it does, call 'done' with that user
  //Otherwise, call 'done' without a user object
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false);}

    if (user) {
      done(null, user);
    } else{
      done(null, false);
    }
  });
});

/// Tell passport to use this strategy
