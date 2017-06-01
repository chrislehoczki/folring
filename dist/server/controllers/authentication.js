'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tokenForUser = tokenForUser;

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Deck from '../models/deck';
var jwt = require('jwt-simple');
var passport = require('passport');

// creates a token for user
function tokenForUser(user) {
  var timestamp = new Date().getTime();
  var id = user._id;
  return jwt.encode({ sub: id, iat: timestamp }, process && process.env && process.env.SECRET || 'blahblah');
}

// signs in a local user
exports.signin = function (req, res, next) {

  passport.authenticate('local', { session: false }, function (err, user, loginError) {
    if (err) {
      return next(err); // will generate a 500 error
    }

    if (loginError) {
      return res.send({ error: loginError });
    }

    var apitoken = tokenForUser(user);
    var composedUser = {
      _id: user._id,
      apitoken: apitoken,
      spectatingRooms: user.spectatingRooms,
      playingRooms: user.playingRooms,
      ownedRooms: user.ownedRooms,
      local: user.local
    };

    // Repond to request indicating the user was created
    return res.json(composedUser);
  })(req, res, next);
};

// signs up a local user
exports.signup = function (req, res, next) {

  var email = req.body.email;
  var password = req.body.password;
  var username = req.body.username;

  // See if a user with the given email exists
  _user2.default.findOne({ email: email }, function (err, existingUser) {
    if (err) {
      return next(err);
    }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.send({ error: 'Email is in use' });
    }

    // If a user with email does NOT exist, create and save user record
    var user = new _user2.default({
      email: email,
      password: password,
      username: username
    });

    user.save(function (err, doc) {
      if (err) {
        return next(err);
      }

      // compose what we want to send down to client from user
      var apitoken = tokenForUser(doc);
      var user = {
        _id: doc._id,
        apitoken: apitoken,
        spectatingRooms: doc.spectatingRooms,
        playingRooms: doc.playingRooms,
        ownedRooms: doc.ownedRooms,
        local: doc.local
      };

      // Repond to request indicating the user was created
      res.json(user);
    });
  });
};

exports.facebookLogin = function (req, res) {
  passport.authenticate('facebook', {
    session: false
  }), function (req, res) {
    var user = req.user;
    console.log('USER');
    res.send(user);
    // res.redirect("/profile?access_token=" + req.user.access_token);
  };
};