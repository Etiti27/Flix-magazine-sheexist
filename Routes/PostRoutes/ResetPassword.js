const router = require('express').Router();
const User= require('../../userSchema');
const nodemailer=require('nodemailer');

let name;

let message='';





router.get('/', function (req, res){
    res.render('Reset', {message: message})
})
router.post('/', function (req, res){
    const {username} = req.body;
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_SERVER,
        // host:'sheexistmag.live',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_ACCOUNT, // generated ethereal user
          pass: process.env.EMAIL_PASSWORD // generated ethereal password
        },
      });
      

    User.findOne({username: username}).then((result)=>{
        if(result){
            name=result.name;
       const body=`<h2> Dear ${name}, </h2>
           <br/>
           <br/>
            <p>You have initiated a password reset, Please Click on the link below to reset your password: </p>
            <br/>
            <p><a href="http://localhost:3000/3erryy67uhrthyreertyoujyiokl">http://localhost:3000/3erryy67uhrthyreertyoujyiokl</a></p>
            
            
                
          <br/>
          <p>we know the world is full of choices. Thank you for choosing us! We appreciate it.</p>

             `
             let mailOptions = {
                from: `"SHEEXIST MAGAZINE" <${process.env.EMAIL_ACCOUNT}>`,
                to: username,
                subject: 'Password Reset!',
                
                html: body
              };
             transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent : ' + info.response);
                  message='Reset link successfully sent to your email'
                  res.redirect('/resetpassword')
                }
              }); 
                  

        }else{
            message='this user does not exist'
            res.redirect('/resetpassword')
        }

           
    })

    

})

module.exports =router;