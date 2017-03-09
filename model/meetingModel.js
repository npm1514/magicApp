var mongoose = require('mongoose');

var Appt = new mongoose.Schema({
    date: {type: String, required:true},
    time: {type: String, required:true},
    duration:{type: Number, required: true}
});

module.exports = mongoose.model('Appt', Appt);
