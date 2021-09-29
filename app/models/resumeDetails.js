let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let max = 5000;

let UserSchema = new Schema(
    {
        name: { type: String, required: true },
        email: {type: String, required: true},
        phone: {type: String, required: true},
        desc: {type: String, required: true},
        edu: {type: String, required: true},
        exp: {type: String,},
        skills: {type: String},
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('set', UserSchema);