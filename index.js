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

app.post('/auth', passport.authenticate('local-signup'), function(req, res){
  res.send();
});

app.post('/user', userCtrl.create);
app.get('/user/me', userCtrl.getme);
app.get('/user/logout', userCtrl.logout);
app.get('/user/:id', userCtrl.read);
app.put('/user/:id', userCtrl.update);
app.delete('/user/:id', userCtrl.delete);

app.get('/meeting',meetingCtrl.read);
app.get('/meeting/:id', meetingCtrl.getOne);
app.post('/meeting',meetingCtrl.create);
app.put('/meeting',meetingCtrl.update);
app.delete('/meeting',meetingCtrl.delete);

var mongoUri = 'mongodb://'+config.userDB+':'+config.passDB+'@ds117929.mlab.com:17929/magicapp';
mongoose.connect(mongoUri);
mongoose.connection.on('error', console.error.bind(console, 'connection error'));
mongoose.connection.once('open', function(){
  console.log("Connected to mongoDB");
});


app.listen(3000, function(){
  console.log("running on 3000");
});
