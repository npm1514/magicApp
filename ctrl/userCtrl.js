var userModel = require('./../model/userModel');
var mongoose = require('mongoose');

module.exports = {
  login: function(req, res){
    res.send();
  },
  read: function(req, res) {
    userModel
    .find(req.query)
    .populate('meetings')
    .exec(function (err, result) {
      if (err) {
        res.send(err);
      }
      res.send(result);
    });
  },
  update: function(req, res){
    userModel
    .findByIdAndUpdate(req.params.id, req.body, function(err, result){
      if (err) {
        return res.send(err);
      }
      res.send(result);
    });
  },
  delete: function(req, res){
    console.log(req.user._id, req.params.id);
      userModel
      .findByIdAndRemove(req.params.id, req.body, function(err, result){
        if (err) {
          res.send(err);
        }
        res.send(result);
      });
  },
  getme: function(req,res) {
    if(!req.user){
      return res.send();
    }
    userModel
    .findById(req.user._id)
    .populate("meetings")
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
