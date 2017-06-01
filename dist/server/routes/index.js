'use strict';

var _authentication = require('../controllers/authentication');

var _user = require('../controllers/user');

var _room = require('../controllers/room');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _reactRouter = require('react-router');

var _App = require('../../client/js/components/App');

var _App2 = _interopRequireDefault(_App);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _index = require('../../client/js/reducers/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// for authentication
var Authentication = require('../controllers/authentication');
var passportService = require('../services/passport');
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', { session: false });
var requireSignin = passport.authenticate('local', { session: false });

// react


module.exports = function (app) {

  // login / signup
  app.post('/auth/signup', Authentication.signup);
  app.post('/auth/login', Authentication.signin);
  // app.post('/login/facebook', Authentication.signinFunUser);

  app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    session: false
  }), function (req, res) {
    var user = req.user;

    var apitoken = (0, _authentication.tokenForUser)(user);

    // res.send(user);
    res.redirect("/?apitoken=" + apitoken);
  });

  app.get('/successMessage', function (req, res) {
    res.send({ success: true });
  });

  app.get('/failureMessage', function (req, res) {
    res.send({ success: false });
  });

  // api
  app.route('/api/user').get(requireAuth, _user.getUser);

  app.route('/api/room/:roomId?').get(requireAuth, _room.getRoom).post(requireAuth, _room.addRoom).delete(requireAuth, _room.deleteRoom);

  app.route('/api/rooms').get(requireAuth, _room.getRooms);

  app.get('/', function (req, res) {
    var store = (0, _redux.createStore)(_index2.default);
    var preloadedState = store.getState();
    var html = _server2.default.renderToString(_react2.default.createElement(
      _reactRedux.Provider,
      { store: store },
      _react2.default.createElement(
        _reactRouter.StaticRouter,
        { context: {}, location: req.url },
        _react2.default.createElement(_App2.default, null)
      )
    ));
    res.send(createPage(html, preloadedState));
  });
};

function createPage(html, preloadedState) {
  var scripts = void 0,
      staticCss = void 0;

  if ((process && process.env && process.env.NODE_ENV || 'production') === 'development') {
    scripts = '<script type="text/javascript" src="/bundle.js"></script>';
    staticCss = '';
  } else {
    scripts = '<script type="text/javascript" src="/dist/vendor.bundle.js"></script><script type="text/javascript" src="/dist/bundle.js"></script>';
    staticCss = '<link rel="stylesheet" type="text/css" href="/dist/styles.css">';
  }

  var page = '<!DOCTYPE html>\n    <html lang="en">\n    <head>\n        <meta charset="utf-8">\n        <title>Folring</title>\n        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">\n        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">\n        ' + staticCss + '\n    </head>\n    <body>\n      <div id="root">' + html + '</div>\n      <script>\n          window.__PRELOADED_STATE__ = ' + JSON.stringify(preloadedState) + '\n      </script>\n      ' + scripts + '\n\n    </body>\n    </html>';

  return page;
}