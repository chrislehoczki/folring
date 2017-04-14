import User from '../models/user';
// import Deck from '../models/deck';
const jwt = require('jwt-simple');
const passport = require('passport');

// creates a token for user
export function tokenForUser(user) {
  const timestamp = new Date().getTime();
  const id = user._id;
  return jwt.encode({ sub: id, iat: timestamp }, process.env.SECRET);
}

// signs in a local user
exports.signin = function(req, res, next) {

    passport.authenticate('local', {session: false}, function(err, user, loginError) {
      if (err) {
        return next(err); // will generate a 500 error
      }

      if (loginError) {
        return res.send({ error: loginError});
      }

       const apitoken = tokenForUser(user);
        const composedUser = {
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
exports.signup = function(req, res, next) {

  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.send({ error: 'Email is in use' });
    }

    // If a user with email does NOT exist, create and save user record
    const user = new User({
          email: email,
          password: password,
          username: username
    });

    user.save(function(err, doc) {
      if (err) { return next(err); }

      // compose what we want to send down to client from user
      const apitoken = tokenForUser(doc);
      const user = {
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

exports.facebookLogin = function(req, res) {
  passport.authenticate('facebook', {
    session: false
    }), function(req, res) {
        const user = req.user;
        console.log('USER',)
        res.send(user);
        // res.redirect("/profile?access_token=" + req.user.access_token);
      }
}
