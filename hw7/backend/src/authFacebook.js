var request = require('request')
var qs = require('querystring')
var express = require('express')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;

const clientSecret='7daaa5fc5b33035f8cacc33e87ab575f'
const clientID='242430559508605';
const callbackURL="http://localhost:3000/auth/callback";
const config={clientSecret, clientID, callbackURL}
var users={}

//serialize the user for the session
passport.serializeUser(function(user, done){
    users[user.id] = user
    done(null, user.id)
})

passport.deserializeUser(function(id, done){
    var user = users[id]
    done(null, user)
})

passport.use(new FacebookStrategy(config, function(token, refreshToken, profile, done){
    process.nextTick(function(){
        //register the user in our system
        return done(null, profile)
    })
}))


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        next()
    }else{
        res.redirect('/login')
    }
}

function profile(req, res){
    res.send({'Login success!': req.user})
}

function fail(req, res){
    res.send({'Login failed': req.user})
}

module.exports = app => {
    app.use(session({secret: 'thisIsMySecretMessageHowWillYouGuessIt'}))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(cookieParser());
    app.use('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}))
    app.use('/auth/callback', passport.authenticate('facebook', {
        successRedirect: '/profile', failureRedirect : '/fail'}))
    app.use('/profile', isLoggedIn, profile)
    app.use('/fail', fail)
}

