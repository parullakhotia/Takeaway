var express=require('express');
app=express();
var session = require("express-session"),
port=process.env.PORT||3000;
bodyParser=require("body-parser");
kabaadi=require('./models/kabaadi.js');
customer=require('./models/customer.js');
user=require('./models/user.js');
mongoose=require("mongoose");
passport=require('passport')
 passportLocalMongoose = require("passport-local-mongoose")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(__dirname + '/public'));

var LocalStrategy=require('passport-local').Strategy;
mongoose.connect("mongodb://localhost/newone",{useNewUrlParser:true});



app.set("view engine","ejs");
app.use(require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false
}));




//mongo "mongodb+srv://kabaadi-vnw2n.mongodb.net/test" --username anmol

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());



var route=require('./routes/route.js')
app.use('/',route);

app.listen(port);
