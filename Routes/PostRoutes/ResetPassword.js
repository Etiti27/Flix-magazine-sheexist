const router = require('express').Router();
const User= require('../../userSchema');


let message;
router.get('/', function (req, res){
    res.render('ResetPassword', {message: message})
})


router.post('/', function (req, res){
    const {username, password} = req.body;
    // console.log(username, password);

    User.findOne({username: username}).then((resp)=>{
        if(resp){
        resp.setPassword(password, function() {
            resp.save()
        message='password successfully resetted!, please login with the new password'
        res.redirect('/resetpassword')
        })}
        else{
            message='this user does not exist'
            res.redirect('/resetpassword')
        };
        

    })
    // User.updateOne({username: username}, {password: password})
    // .then((res)=>{
    //     console.log(res);
    // })
    // .catch((err)=>{
    //     console.log(err);
    // })
    

})
module.exports =router;