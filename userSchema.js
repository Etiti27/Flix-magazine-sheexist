const mongoose = require('mongoose');
const passport=require('passport');
const session=require('express-session');
const passportLocalMongoose=require('passport-local-mongoose');

const userSchema= new mongoose.Schema({
    name:String,
    email:String,
    username:String,
    country:String,
    password:String
})
userSchema.plugin(passportLocalMongoose)
const User=mongoose.model('user', userSchema);
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
module.exports=User;