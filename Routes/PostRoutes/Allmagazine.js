const express= require('express');
const router=express.Router();
const User= require('../../MongoDB/userSchema');
const mongoose= require('mongoose');
const firstMagazine=require('../../MongoDB/FirstMagSchema')


router.get('/', (req, res) => {
    if(req.isAuthenticated()){
        const username=req.user.username

        res.render('allmagazine', {username: username});
    }else{
        res.redirect('/');
    }
    
});
router.post('/', (req, res) => {
    const {username}=req.body;
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
        console.log(err);
    });
    
});



module.exports=router;