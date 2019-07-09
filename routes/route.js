var express = require("express");

var rout  = express.Router();
kabaadi=require('../models/kabaadi.js');
customer=require('../models/customer.js');
user=require('../models/user.js');
items=require('../models/items.js');
var passport=require('passport');



var path = require('path');


rout.get('/',function(req,res)
{
	res.render('new.ejs',{currentUser:null})
})
rout.get('/login',function(req,res)
{
  res.render('login.ejs');
})
rout.post('/login', passport.authenticate('local', {failureRedirect: '/login' }),
  function(req, res) {
    
    res.render('new.ejs',{currentUser:req.user});
  });
rout.get('/logout',function(req,res)
{
   req.logout();
   res.redirect('/')
})


rout.get('/:id/sell',isLoggedin_std,function(req,res)
{
  res.render('takewayform.ejs',{id:req.params.id })
})
rout.post('/:id/sell',isLoggedin_std,function(req,res)
{
  customer.find({},function(err,c)
  {
    console.log(c);
  })
	customer.findOne({user:req.params.id},function(err,customer)
  {
    if(err)
      console.log(err);

    else
    {
       console.log(customer);
    items.create(req.body.img,function(err,irst){
        if(err)
          console.log(err)
        else
        {
          console.log(irst);
           customer.items.push(irst._id);
           customer.save();
           res.redirect('/buy');
        }
      
    })
     
    }
  })
});
rout.get('/buy',function(req,res){
  customer.find({},function(err,cus)
  {
    if(err)
      console.log(err);
    var myid=[];
  
           items.find({},function(err,itemsnew)
           {
                 if(err)
                  console.log(err)
                else
                {

        res.render('buyer.ejs',{item:itemsnew});
  
                }
               
           })
      
     
    })
});
rout.get('/seller',function(req,res)
{
  
    res.send('a mail has been sent to your registered emailid with a link click it if you want to accept the proposal')
})
rout.get('/signup',function(req,res)
{
user.find({},function(err,jj)
    {
    	if(err)
    		console.log(err);
    	else
    		{
    			for(var k=0;k<jj.length;k++)
    			console.log(jj[k]);
    		}
    })

  res.render('signup.ejs');
});
rout.post('/signup',function(req,res)
{

	var users=new user({
         username:req.body.username,
         emailid:req.body.emailid,
         phonenumber:req.body.phonenumber,
        userType:req.body.usertype

    });
	user.register(users,req.body.password,function(err,user)
  	{
		
        if(err)
        	console.log(err);
        else
        {
        	console.log(user);
        	if(user.userType=="kabaadi")
          {

         res.redirect(user._id+'/signup2');
          }
          else
          {
            var obj=new customer({
              user:user._id
            });
            customer.create(obj,function(err,yo)
            {
              if(err)
                console.log(err);
              else
                res.send('customer created');
            })
          }
        }
  	})
});


rout.get('/:id/signup2',function(req,res)
{
   	res.render('takeaway.ejs',{id:req.params.id});
});

rout.post('/:id/signup2',function(req,res)
{
  var obj=new kabaadi({
    user:req.params.id,
    location:req.body.location,
        rate:req.body.rate,
        maxdeliverycircle:req.body.maxdeliverycircle
      });
   kabaadi.create(obj,function(err,taker)
   {
     if(err)
     	console.log(err)
     else
     {
       res.send("kabaddi has been created");
     }
   });
});

 function isLoggedin_std(req, res, next){
  if(req.isAuthenticated()){
    next();
  }
  else{
    res.redirect('/login');
  }
}
 
module.exports=rout;