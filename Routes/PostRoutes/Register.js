const express= require('express');
const router=express.Router();
const User= require('../../userSchema');
const passport=require('passport');
const session=require('express-session');
const passportLocalMongoose=require('passport-local-mongoose');

let errorMessage="";
router.post('/', (req, res) => {
    const {username, password, country, name} = req.body;
    // const newUser = new userModel({
    //     username,
    //     password,
    //     email,
    //     name
    // })
    // newUser.save()
    // .then(() => {
    //     res.redirect('/')
    // })
    
    User.register({username: username, country: country, name: name}, 
        password, function(err, user) {
            if (err) {
                console.log(err.message);
               errorMessage=err.message
                res.redirect('/register')
            }
            if (user) {
                console.log(user);
                passport.authenticate('local')(req, res, function(){
                    res.redirect('/allmagazine');
                });
            }
    })
})

router.get('/', (req, res) => {
    res.render('Register', {errorMessage: errorMessage})
})
module.exports = router;