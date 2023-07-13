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



//connect to MongoDB
DB.DBmongo();

//middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
       
}))
app.use(passport.initialize());
app.use(passport.session());


app.use('/register', RegisterRoute);
app.use('/login', LoginRoute);
app.use('/allmagazine', AllmagazineRoute);
app.use('/populate', populate);



app.get('/', (req, res) => {
    res.render('login');
})


app.listen(3000, () => {
    console.log('server is running!!!');
})



