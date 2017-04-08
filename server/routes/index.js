
// for authentication
const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

import { tokenForUser } from '../controllers/authentication';

// react
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import ReactApp from '../../client/js/components/App';

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
        const apitoken = tokenForUser(user);
        // res.send(user);
        res.redirect("/?apitoken=" + apitoken);
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



    app.get('*', (req, res) => {
    // const match = routes.reduce((acc, route) => matchPath(req.url, route, { exact: true }) || acc, null);
    // if (!match) {
    //     res.status(404).send(render(<h1>No Match</h1>));
    //     return;
    // }
    console.log('APP', app)
    const html = ReactDOMServer.renderToString(<StaticRouter context={{}} location={req.url}>
                                  <ReactApp />
                                </StaticRouter>);

    res.send(createPage(html));
    
    });

  	// api
  	// app.route('/api/user')
  	// 	.get(requireAuth, DAO.getUser);

  	// all other renders
    // app.get('/*', handleRender);

};



function createPage(html) {
  let scripts, staticCss;

  if (process.env.NODE_ENV === 'development') { 
    scripts = `<script type="text/javascript" src="/bundle.js"></script>`;
    staticCss = '';
  } else {
    scripts = `<script type="text/javascript" src="/dist/vendor.bundle.js"></script><script type="text/javascript" src="/dist/bundle.js"></script>`;
    staticCss = '<link rel="stylesheet" type="text/css" href="/dist/styles.css">';
  }

  const page = 
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Folring</title>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
        ${staticCss}
    </head>
    <body>
      <div id="root">${html}</div>
      ${scripts}
    </body>
    </html>`;

  return page;
}

