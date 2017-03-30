var UserModel = require('./../model/userModel');
var mongoose = require('mongoose');

module.exports = {
  login: function(req, res){
    res.send();
  },
  read: function(req, res) {
    UserModel
    .find(req.query)
    .exec(function (err, result) {
      if (err) {
        res.send(err);
      }
      res.send(result);
    });
  },
  update: function(req, res){
    UserModel
    .findByIdAndUpdate(req.params.id, req.body, function(err, result){
      if (err) {
        return res.send(err);
      }
      res.send(result);
    });
  },
  delete: function(req, res){
      UserModel
      .findByIdAndRemove(req.params.id, req.body, function(err, result){
        if (err) {
          res.send(err);
        }
        console.log(req.params.id + " has been deleted");
        res.send(result);
      });
  },
  getme: function(req,res) {
    if(!req.User){
      return res.send();
    }
    UserModel
    .findById(req.User._id)
    .exec(function (err, result) {
      if (err) {
        return res.send(err);
      }
      res.send(result);
    });
  },
  logout: function(req,res) {
    var user = req.user.firstname
    req.logout();
    console.log(user + " has been logged out");
    res.send(user + " has been logged out");
  }
};
