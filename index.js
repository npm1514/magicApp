var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');

var meetingCtrl = require('./ctrl/meetingCtrl');
var userCtrl = require('./ctrl/userCtrl');
var config = require('./config/config')

var app = express();

require('./config/passport.js')(passport);

app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: true
}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/public'));

app.post(
  '/login',
  passport.authenticate('local-signup'),
  userCtrl.login
);

app.get('/users', userCtrl.read);
app.get('/me', userCtrl.getme);
app.get('/logout', userCtrl.logout);
app.put('/users/:id', userCtrl.update);
app.delete('/users/:id', userCtrl.delete);

app.get('/meetings',meetingCtrl.read);
app.get('/meetings/:id', meetingCtrl.getOne);
app.post('/meetings',meetingCtrl.create);
app.put('/meetings/:id',meetingCtrl.update);
app.delete('/meetings/:id',meetingCtrl.delete);

var mongoUri = 'mongodb://'+config.userDB+':'+config.passDB+'@ds117929.mlab.com:17929/magicapp';
mongoose.connect(mongoUri);
mongoose.connection.on('error', console.error.bind(console, 'connection error'));
mongoose.connection.once('open', function(){
  console.log("Connected to mongoDB");
});

app.listen(3000, function(){
  console.log("running on 3000");
});
