  var express = require("express");
  var app = express();
  var hbs = require("hbs")
  var mongoose = require("mongoose");
  var bodyParser = require("body-parser");
  var User = require("./user");
  var someUser;

  app.set("view engine", "hbs");

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
  	extended : true
  }));

  app.get("/", function(request,respond){
  	respond.render("home");
  });

  app.get("/login", function(request,respond){
  	respond.render("login");
  });

  app.post("/login", function(req, res){
  	User.findOne({"username": req.body.username}, function(err, user){
  		if(err){
  			conosle.log(err);
  		} else {
  			someUser = user;
  			res.redirect("/data");
  		}
  	});
  });

  app.get("/signup", function(request,respond){
  	respond.render("signup");
  });

  app.post("/signup", function(req, res){
  	new User({
  		username: req.body.username,
  		password: req.body.password
  	}).save(function(err){
  		if(err){
  			console.log(err);
  		} else {
  			res.redirect("/login");
  		}
  	});
  });

  app.get("/data", function(request,respond){
  	respond.render("data", {
  		user: someUser
  	});
  });

  mongoose.connect("mongodb://localhost/user");
  app.listen(8080);
  console.log("server is running!");