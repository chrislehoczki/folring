
// for authentication
const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

import { tokenForUser } from '../controllers/authentication';

module.exports = (app) => {

	// login / signup
  	app.post('/auth/signup', Authentication.signup);
  	app.post('/auth/login', Authentication.signin);
  	// app.post('/login/facebook', Authentication.signinFunUser);

  	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
   			 session: false
    	}), function(req, res) {
        const user = req.user;
        user.apitoke = tokenForUser(user);
        res.send(user);
        // res.redirect("/profile?access_token=" + req.user.access_token);
      });

 //   	app.get('/auth/facebook/callback',
	// 	  passport.authenticate('facebook', { session: false, failureRedirect: "/" }),
		  
	// );

    app.get('/successMessage', (req, res) => {
    	res.send({success: true})
    })

    app.get('/failureMessage', (req, res) => {
    	res.send({success: false})
    })

  	// api
  	// app.route('/api/user')
  	// 	.get(requireAuth, DAO.getUser);

  	// all other renders
    // app.get('/*', handleRender);

};

