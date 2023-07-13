const express = require('express');
const User= require('../../MongoDB/userSchema');
const router=express.Router();
const passport=require('passport');

router.get('/',(req,res)=>{
    res.render('Login');
});

router.post('/',(req,res)=>{
    const {username,password} = req.body

    const user=new User({
        username,
        password
    });
    req.logIn(user, function(err){
        if(err) {
            res.redirect('/login');
        }
        else{
            passport.authenticate('local')(req, res,function(){
                res.redirect('/allmagazine');
            })
        }
    });
})
module.exports = router;