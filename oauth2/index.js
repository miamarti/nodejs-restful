var express = require('express'),
    bodyParser = require('body-parser'),
    oauthserver = require('oauth2-server'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', function (err, res) {
  if (err) {
    console.log ('ERROR to connecting');
  } else {
    console.log ('Succeeded to connected');
  }
});

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.oauth = oauthserver({
  model: require('./model'),
  grants: ['password', 'authorization_code', 'refresh_token'],
  debug: true
});

app.all('/oauth/token', app.oauth.grant());

app.get('/oauth/authorise', function(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/session?redirect=' + req.path + '&client_id=' +
      req.query.client_id + '&redirect_uri=' + req.query.redirect_uri);
  }

  res.render('authorise', {
    client_id: req.query.client_id,
    redirect_uri: req.query.redirect_uri
  });
});

// Handle authorise
app.post('/oauth/authorise', function(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/session?redirect=' + req.path + 'client_id=' +
      req.query.client_id +'&redirect_uri=' + req.query.redirect_uri);
  }

  next();
}, app.oauth.authCodeGrant(function(req, next) {
  // The first param should to indicate an error
  // The second param should a bool to indicate if the user did authorise the app
  // The third param should for the user/uid (only used for passing to saveAuthCode)
  next(null, req.body.allow === 'yes', req.session.userId, null);
}));

app.get('/secret', function(req, res) {
  res.send('Secret area');
});

app.use(app.oauth.errorHandler());

app.listen(3003);
