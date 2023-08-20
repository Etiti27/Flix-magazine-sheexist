// const express = require('express');
// const router = express.Router();
require('dotenv').config();
const router = require('express').Router();
const User= require('../../userSchema');
const passport=require('passport');
const URL=process.env.URL
const message='Username and password does not match!';
router.get('/', (req, res)=>{
    console.log(req.session);
    res.render('notfound', {message:message, URL:URL});
});
router.post('/',(req,res)=>{
    const {username,password} = req.body;
    console.log(username,password);

    const user=new User({
        username,
        password
    });
    req.logIn(user, function(err, user){
        if(user) {
            passport.authenticate('local')(req, res,function(){
                console.log('trigered 1');
                res.redirect('/allmagazine');
            })
            if (!user) {
               console.log(`ttrying`); 
            }
           
        }
        if(!user){
            console.log(`ttrying2`);
        }
        else{
            console.log(`triggered 2`);
            res.redirect('/notfound')
        }
       
    });
})
module.exports= router;