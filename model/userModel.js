var mongoose  = require('mongoose'),
    bcrypt    = require('bcrypt-nodejs');

var Meeting = require('./meetingModel');
var LoginManager = require('./loginManagerModel');

  var User = new mongoose.Schema({
      password: {type: String, required: true },
      firstname: {type: String, required: true},
      lastname: {type: String, required: true},
      email: {type: String, required: true},
      loginManager: [LoginManager],
      meetings: [Meeting]
  });

  User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

  User.methods.validPassword = function(password) {
      return bcrypt.compareSync(password, this.password);
  };

  module.exports = mongoose.model('User', User);
