const express = require('express');
const User= require('../../userSchema');
const router=express.Router();
const passport=require('passport');




router.get('/',(req,res)=>{
    res.render('Login');
});


    router.post('/', passport.authenticate('local', { failureRedirect: '/notfound'}),(req,res)=>{
        res.redirect('/allmagazine');



    // const {username,password} = req.body;
    // console.log(username,password);

    // const user=new User({
    //     username,
    //     password
    // });
    // req.logIn(user, function(err){
        
    //     if(!err) {
          
    //     //    console.log(res);
    //         passport.authenticate('local')(req, res,function(){
    //             console.log(`i am auth ${req.isAuthenticated()}`);
    //             console.log(` i am unauth ${req.isUnauthenticated()}`);
    //             console.log(`trigger`);
    //             res.redirect('/allmagazine');
            
            
    //         })
    //     }
    //     else{
    //         console.log(`triggered 3`);
    //         res.redirect('/notfound')
    //     }
       
    // });
})

// router.post('/', (req, res, next) => {
//     const {username,password} = req.body;
//     console.log(username,password);

//     const user=new User({
//         username,
//         password
//     });
//     passport.authenticate('local',
//     (err, user, info) => {
//       if (err) {
//         return next(err);  // default express error handler - unauthorized 
//       }
  
//       if (!user) {
//         return res.redirect('/signup'); // you can redirect user to signup page if needed
//       }
  
//       req.logIn(user, function(err) {
//         if (err) {
//           return next(err);
//         }
//         return res.redirect('/dashboard');
//       });
  
//     })(req, res, next);
//   });
module.exports = router;