'use strict';

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var passport = require('passport');

var JwtStrategy = require('passport-jwt').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local');

// Create local strategy
var localOptions = { usernameField: 'email' };
var localLogin = new LocalStrategy(localOptions, function (email, password, done) {
  // Verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  _user2.default.findOne({ email: email }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, 'No user was found');
    }

    // compare passwords - is `password` equal to user.password?
    user.comparePassword(password, function (err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false, 'The password you provided does not match');
      }

      return done(null, user);
    });
  });
});

// Setup options for JWT Strategy
var jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process && process.env && process.env.SECRET || 'blahblah' || 'supersecret',
  ignoreExpiration: true
};

// Create JWT strategy
var jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {

  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that other
  // otherwise, call done without a user object
  _user2.default.findById(payload.sub, function (err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

var facebookLogin = new FacebookStrategy({
  // pull in our app id and secret from env
  clientID: process && process.env && process.env.FACEBOOK_APP_ID || '1231772836939465',
  clientSecret: process && process.env && process.env.FACEBOOK_APP_SECRET || 'aacdbe54629b04e33172a4ab88785b3f',
  callbackURL: "http://folring.azurewebsites.net/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'email', 'name']
},

// facebook will send back the token and profile
function (token, refreshToken, profile, done) {
  console.log('PROFILE', profile);
  // asynchronous
  process.nextTick(function () {

    // find the user in the database based on their facebook id
    _user2.default.findOne({ 'facebook.id': profile.id }, function (err, user) {

      // if there is an error, stop everything and return that
      // ie an error connecting to the database
      if (err) return done(err);

      // if the user is found, then log them in
      if (user) {
        return done(null, user); // user found, return that user
      } else {
        // if there is no user found with that facebook id, create them
        var newUser = new _user2.default();

        // set all of the facebook information in our user model
        newUser.facebook = {};
        newUser.facebook.id = profile.id; // set the users facebook id                   
        newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
        newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
        newUser.facebook.displayName = profile.displayName;
        newUser.facebook.firstName = profile.name.givenName;
        newUser.facebook.familyName = profile.name.familyName;
        // save our user to the database
        newUser.save(function (err) {
          if (err) throw err;

          // if successful, return the new user
          return done(null, newUser);
        });
      }
    });
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);

passport.use(facebookLogin);