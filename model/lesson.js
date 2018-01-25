var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var lesson = new Schema({
    name: String,
    description: String,
    details:String,
    example: [{type: ObjectId, ref:'Example'}]
});

module.exports = mongoose.model('Lesson', lesson);