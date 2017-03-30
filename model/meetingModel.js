var mongoose = require('mongoose');

var Meeting = new mongoose.Schema({
    date: {type: String, required:true},
    time: {type: String, required:true},
    duration: {type: Number, required: true},
    topic: {type: String, required:true},
    phone: Number,
    accesscode: Number
});

module.exports = Meeting;
