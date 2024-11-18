const { required } = require("joi");
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    email:
    {
        type:String,
        required:true,
    }
});

userSchema.plugin(passportLocalMongoose); 
// its perform the username ,passwords , hashing //   salting

module.exports = mongoose.model('User' ,userSchema);

