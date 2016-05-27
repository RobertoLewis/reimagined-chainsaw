const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

//"session:false"  because we don't want passport to create a cookie-based session
const requireAuth = passport.authenticate('jwt', { session: false});
const requireSignin = passport.authenticate('local', {session: false});

module.exports = function(app){
  //dummy route
  app.get('/', requireAuth, function(req, res){
    res.send({hi: 'there'});
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);

}
