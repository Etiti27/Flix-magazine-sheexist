const express= require('express');
const router=express.Router();
const User= require('../../userSchema');
const passport=require('passport');
const session=require('express-session');
const passportLocalMongoose=require('passport-local-mongoose');
const nodemailer=require('nodemailer');
// const User= require('../../userSchema');

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
                // console.log(err.message);
               errorMessage=err.message
                res.redirect('/register')
            }
            if (user) {
                // console.log(user);
                passport.authenticate('local')(req, res, function(){


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
                      const body=`<h2> Dear ${name}, </h2>
                      
                      
                       <p>Thank You for Registering to Sheexist Digital Magazine.   </p>
                       <p>We know the world is full of choices. Thank you for choosing us!.</p>
                       <p>Enjoy! as we continue to roll out amazing contents for your pleasures</p>`
                       let mailOptions = {
                        from: `"SHEEXIST MAGAZINE" <${process.env.EMAIL_ACCOUNT}>`,
                        to: username,
                        subject: 'Congratulation!',
                        
                        html: body
                      };
                     transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent : ' + info.response);
                        //   message='Reset link successfully sent to your email'
                        //   res.redirect('/resetpassword')
                        }
                      });
                    res.redirect('/allmagazine');
                });
            }
    })
})

router.get('/', (req, res) => {
    res.render('Register', {errorMessage: errorMessage})
})
module.exports = router;