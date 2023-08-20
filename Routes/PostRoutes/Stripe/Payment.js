
require('dotenv').config();
const express = require('express');
const router = express.Router();
const firstMagazine=require('../../../MongoDB/FirstMagSchema');
const endpointSecret = process.env.ENDPOINTSECRET;
const Stripe = require('stripe');
const stripe = Stripe(process.env.API_KEY);



let prices;
let usernames;

router.get('/payment', (req, res) => {
    prices=req.session.price;
    usernames=req.session.user;
    
    res.render('payment', {price: prices, username:usernames})
})

    // This is your test secret API key.
// const stripe = require('stripe')('sk_test_51IaTkcC0CwnsvPwnCSYRQIf4sxSypdrzTGavMEGCGSV7zTZLi2J3QtdmDGRYO3gls0S62juXJmBpTN258exlieSf00N6gOxPiK');
// const express = require('express');
// const app = express();
// app.use(express.static('public'));


// let user;
// console.log(user);
router.post('/create-checkout-session', async (req, res) => {
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
                  images: ['https://app.gemoo.com/share/image-annotation/549830799026540544?codeId=M035BQ4a8oz1R&origin=imageurlgenerator'],
                },
                unit_amount: prices * 100,
              },
              quantity: 1,
            },
    ],
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `http://localhost:3000/allmagazine`,
    cancel_url: `http://localhost:3000`,
  });
//   res.send({
//     url:session.url
// });
  res.redirect(303, session.url);
});


//webhooks



router.post('/webhook',  express.raw({type: 'application/json'}), async (request, response) => {
  const sig = request.headers['stripe-signature'];
 

// console.log(`i am the secind user ${usernames} & ${prices}`);
  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':

      // const checkoutSessionCompleted = event.data.object;
      // Then define and call a function to handle the event checkout.session.completed
     
      
        const newPurchase = new firstMagazine({
          username:usernames
        })
        newPurchase.save()
       
      
      

      break;
    // ... handle other event types
    default:
      // console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send()
});



module.exports = router;
// exports.user=user;
