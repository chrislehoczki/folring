
// for authentication
const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {

	// login / signup
  	app.post('/signup', Authentication.signup);
  	app.post('/signin', Authentication.signin);
  	// app.post('/login/facebook', Authentication.signinFunUser);

  	// api
  	// app.route('/api/user')
  	// 	.get(requireAuth, DAO.getUser);

  	// all other renders
    // app.get('/*', handleRender);

};

