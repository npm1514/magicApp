var mongoose = require('mongoose');

var LoginManager = new mongoose.Schema({
  app: String,
  username: String,
  password: String
});

module.exports = LoginManager;
