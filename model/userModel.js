var mongoose  = require('mongoose'),
    bcrypt    = require('bcrypt-nodejs');

var meetingModel = require('./../model/meetingModel');

  var User = new mongoose.Schema({
      password: {type: String, required: true },
      firstname: {type: String},
      lastname: {type: String},
      email: {type: String, required: true}
  });

  User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

  User.methods.validPassword = function(password) {
      return bcrypt.compareSync(password, this.password);
  };

  module.exports = mongoose.model('User', User);
