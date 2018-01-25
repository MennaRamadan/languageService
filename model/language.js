var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var language = new Schema({
   name: String,
    title:String,
    introduction: String,
    lesson:[{type: ObjectId, ref:'Lesson'}]
});

module.exports = mongoose.model('Language',language);