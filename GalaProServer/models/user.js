var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActionSchema = new Schema({
    sliderValue: {
        type: Number,
        required: [true, 'Slider value cannot be empty']
    },
    message: {
        type: String,
        required: [true, 'Message cannot be empty']
    },
});

var UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name cannot be empty']
    },
    actions: [ActionSchema]
}, { versionKey: false });

var User = mongoose.model('User', UserSchema);

module.exports = User;