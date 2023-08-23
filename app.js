require('dotenv').config()
const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const passport=require('passport');
const session=require('express-session');
const passportLocalMongoose=require('passport-local-mongoose');
const DB=require('./MongoDB/MongoDB');
const RegisterRoute=require('./Routes/PostRoutes/Register');
const LoginRoute=require('./Routes/PostRoutes/Login');
const AllmagazineRoute=require('./Routes/PostRoutes/Allmagazine');
const populate=require('./Routes/PostRoutes/Populate');
// const Payment=require('./Routes/PostRoutes/Stripe/Payment');
const NotFound=require('./Routes/PostRoutes/NotFound');
const ResetPassword=require('./Routes/PostRoutes/ResetPassword').router;
const ResetLink=require('./Routes/PostRoutes/ResetPassword').resetLink;
const User=require('./userSchema');
// const ResetPassword=require('./Routes/PostRoutes/ResetPassword');
const firstMagazine=require('./MongoDB/FirstMagSchema');
const Stripe = require('stripe');
const stripe = Stripe(process.env.API_TEST_KEY);
const endpointSecret = process.env.TEST_ENDPOINTSECRET;
const cors=require('cors');











// const endpointSecret =process.env.ENDPOINT_SECRET;

// const Webhook=require('./Routes/PostRoutes/Stripe/Webhook');

// const Webhook=require('./Routes/PostRoutes/Stripe/Webhook');



//connect to MongoDB
DB.DBmongo();

//middleware
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

app.use('/webhook', bodyParser.raw({type: "*/*"}));
app.use(bodyParser.json({type: 'application/json'}));

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
       
}))
app.use(passport.initialize());
app.use(passport.session());

// console.log(`the user is ${userr}`);
app.use('/register', RegisterRoute);
app.use('/login', LoginRoute);
app.use('/allmagazine', AllmagazineRoute);
app.use('/populate', populate);
// app.use('/', Payment);
app.use('/notfound', NotFound);
app.use('/resetpassword', ResetPassword);



app.get('/', (req, res) => {
    res.render('login');
})


let prices;
let usernames;

app.get('/payment', (req, res) => {
    prices=req.session.price;
    usernames=req.session.user;
    
    res.render('payment', {price: prices, username:usernames});
});


let message;

app.get(`/${ResetLink}`, function (req, res){
    res.render('ResetPassword', {message: message, resetLink:ResetLink})
})
app.post(`/${ResetLink}`, function async (req, res){
    const {username, password} = req.body;
    // console.log(username, password);

    User.findOne({username: username}).then((resp)=>{
        if(resp){
        resp.setPassword(password, function() {
            resp.save()
        message='password successfully resetted!, please login with the new password'
        res.redirect(`/${ResetLink}`)
        })}
        else{
            message='this user does not exist'
            res.redirect(`/${ResetLink}`)
        
        };
        

    })
    
    

})
//payment

app.post('/create-checkout-session', async (req, res) => {
    // console.log(prices);
    // console.log(usernames);
    // username=req.session.username
    // console.log(req.session.username);
    
    // console.log(process.env.API_TEST_KEY);
    // console.log(username)
    
    
  
  const session = await stripe.checkout.sessions.create({
    line_items: [
        
            {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: 'SHE EXIST DIGITAL MAGAZINE',
                  images: ['https://sheexistmag.live/pics/cover.jpg'],
                },
                unit_amount: prices * 100,
              },
              quantity: 1,
            },
    ],
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `${process.env.URL}/allmagazine`,
    cancel_url: `${process.env.URL}/`
  });
//   res.send({
//     url:session.url
// });
  res.redirect(303, session.url);
});

app.post('/webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {
    const sig = request.headers['stripe-signature'];
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    switch (event.type) {
        case 'checkout.session.completed' :
    
          // const checkoutSessionCompleted = event.data.object;
          // Then define and call a function to handle the event checkout.session.completed
         
          
            const newPurchase = new firstMagazine({
              username:usernames
            })
            newPurchase.save()
           
          
          
    
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    
      // Return a 200 response to acknowledge receipt of the event
      response.send()
    });


app.listen(3000, () => {
    console.log('server is running!!!');
});