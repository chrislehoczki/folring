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

      return res.json(user);

      // populate playing rooms and spectating rooms for user

      // user.populate('decks', function(err, populatedUser) {
      //     if (err) {
      //         res.send({err: true})
      //     }
          
      //     const userData = {
      //       username: populatedUser.username,
      //       _id: populatedUser._id,
      //       decks: populatedUser.decks,
      //       uploads: populatedUser.uploads,
      //       apitoken: tokenForUser(user)
      //     };
      //     

      // });
      
  })(req, res, next);
};

// signs up a local user
exports.signup = function(req, res, next) {
  console.log('REQ BODY', req.body)
  const email = req.body.email;
  const password = req.body.password;

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
      password: password
    });

    user.save(function(err, doc) {
      if (err) { return next(err); }

      // compose what we want to send down to client from user
      const apitoken = tokenForUser(doc);
      const user = {
        _id: doc._id,
        apitoken: apitoken,
        spectatingRooms: doc.spectatingRooms,
        playingRooms: doc.playingRooms
      };
      
      // Repond to request indicating the user was created
      res.json(user);
    });
  });
};

exports.facebookLogin = function(req, res) {
  console.log('GETTING HERE', req)
  passport.authenticate('facebook', {
    session: false
    }), function(req, res) {
        const user = req.user;
        console.log('USER',)
        res.send(user);
        // res.redirect("/profile?access_token=" + req.user.access_token);
      }
}
