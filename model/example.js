var mongoose = require('mongoose');
var Schema  = mongoose.Schema;


var example = new Schema({
    name: String,
    description: String
});

module.exports = mongoose.model('Example', example);