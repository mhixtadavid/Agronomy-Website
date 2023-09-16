var express = require('express'),
    app = express(),
    dotenv = require('dotenv').config(),
    session = require('express-session'),
    flash = require("connect-flash"),
    methodOverride = require('method-override'),
    LocalStrategy = require('passport-local');
    
var indexRoutes = require("./routes/index");

app.use(require("express-session")({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))
app.use(flash())
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(indexRoutes);

var port = process.env.PORT;
app.listen(port, function () {
    console.log("Server Active and Running on Port: " + port)
});