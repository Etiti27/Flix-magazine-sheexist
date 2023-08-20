const express= require('express');
const router=express.Router();
const User= require('../../userSchema');
const mongoose= require('mongoose');
const firstMagazine=require('../../MongoDB/FirstMagSchema')


router.get('/', (req, res) => {
    if(req.isAuthenticated()){
        const username=req.user.username
        // console.log(username);

        res.render('allmagazine', {username: username});
    }else{
        res.redirect('/');
    }
    
});
router.post('/', (req, res) => {
    const {username, price}=req.body;
    req.session.user = username;
    req.session.price = price;
    // console.log(price);
    // console.log(req.session.user);
    // firstMagazine.findOne({username: username}, (err, result) => {
    //     if(err){
    //         console.log(err);
    //     }
    //     if(!result){
    //         res.redirect('/payment');
    //     }
    //     else{
    //         res.render('index');
    //     }

    
    // })

    firstMagazine.findOne({username: username})
    .then((result) => {
        if(!result){
            res.redirect('/payment');
            
        }
        else{
            res.render('index');  
        }
    })
    .catch((err) => {
        // console.log(err);
        throw err;
    });
    
});



module.exports=router;