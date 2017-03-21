var meetingModel = require('./../model/meetingModel');
var mongoose = require('mongoose');

module.exports = {
    create: function(req, res) {
      var meeting = new meetingModel(req.body);
      meeting.save(function(err, result){
        if (err) {
          res.send(err);
        }
        res.send(result);
      });
    },
    read: function(req, res) {
      meetingModel
      .find(req.query)
      .exec(function (err, result) {
        if (err) {
          res.send(err);
        }
        res.send(result);
      });
    },
    getOne: function(req, res) {
      meetingModel
      .findById(req.params.id)
      .exec(function (err, result) {
        if (err) {
          return res.send(err);
        }
        res.send(result);
      });
    },
    update: function(req, res){
      meetingModel
      .findByIdAndUpdate(req.params.id, req.body, function(err, result){
        if (err) {
          res.send(err);
        }
        res.send(result);
      });
    },
    delete: function(req, res){
      meetingModel
      .findByIdAndRemove(req.params.id, req.body, function(err, result){
        if (err) {
          res.send(err);
        }
        res.send(result);
      });
    }
};
