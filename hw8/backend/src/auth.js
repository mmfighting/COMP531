const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const md5 = require('md5')
const User = require('./model.js').User
const Profile = require('./model.js').Profile

const redis = require('redis').createClient("redis://h:p233u15m27m5s54ns3ti7dt6rpb@ec2-54-83-63-242.compute-1.amazonaws.com:11509")

var request = require('request')
var qs = require('querystring')
var express = require('express')
var session = require('express-session')
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;

let cookieKey = 'sid'

const register = (req, res) => {
    const salt = [Date.now(), req.body.username].join(':')
    const newpassword = md5([salt, req.body.password].join(':'))
    if (!req.body.username || !req.body.password) {
        res.status(401).send("Invalid input")
        return;
    }else{
        User.find({username: req.body.username}, function(err, obj){
            if(err){
                return res.status(401).send("Error:" + err)
            }else if(obj.length>0){
                return res.status(401).send("username already exist!")
            }else{
                new User({username: req.body.username, salt: salt, hash: newpassword }).save(function () {
                        console.log("User " + req.body.username + " created.")
                    }
                )
                new Profile({'username': req.body.username,
                    'headline': 'Post something new here...',
                    'following': [],
                    'email': req.body.email,
                    'dob': req.body.dob,
                    'zipcode': req.body.zipcode,
                    'avatar': 'https://www.drupal.org/files/profile_default.png'
                }).save(function(err, item){
                    console.log('done with save profile for'+ req.body.username)
                    res.status(200).send({result: "success", username: item['username']})
                })
            }
        })
    }
    
}

function getUser(name) {
    return new Promise(function (resolve, reject) {
        User.find({username: name}).exec(function (err, items) {
            if (items.length === 1) {
                resolve(items[0])
            } else {
                reject("error: no result or multiple result found")
            }
        })
    })
}

function salthash(userObj) {
    var username = userObj.username
    var code = [Date.now(), username].join(':')
    return md5(code)
}

const login = (req, res) => {
    var username = req.body.username
    var password = req.body.password
    if (!username || !password) {
        res.status(401).send("invalid input")
        return
    }

    getUser(username).then( (userObj)=> {
        const userSalt = userObj['salt']
        const newpassword = md5([userSalt, password].join(':'))

        if (!userObj || userObj.hash !== newpassword) {
            res.status(401).send("wrong credentials")
            return false
        }

        const sid = salthash(userObj)

        res.cookie(
            cookieKey,
            sid,
            {maxAge: 3600 * 1000, httpOnly: true}
        )

        redis.hmset(sid, userObj)
        console.log("sid: "+sid)
        var msg = {username: username, result: 'success'}
        res.send(msg)
        return true
    }).catch(function(err){console.log("Error:"+err)})
}

const putpassword = (req, res)=> {
    var username = req.username
    var password = req.body.password
    console.log("update password for user: "+ username)
    console.log("new password:"+password)
    if (!username || !password) {
        res.status(400).send("invalid input")
        return
    }
    const userSalt=[Date.now(), username].join(':')
    const newpassword=md5([userSalt, password].join(':'))
    User.findOneAndUpdate({username: username},{ salt: userSalt , hash: newpassword}, function(err){
        if(!err){
            var msg = {username: username, status: 'Password updated'}
            res.send(msg)
        }else{
            res.status(401).send(err)
        }
    })
}


function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        req.username = req.user.displayName+'@facebook'
        next()
        return
    }
    if(!req.cookies){
        return res.status(401).send('Unauthorized, no cookie!')
    }
    console.log("checking whether user is local logged in...")
    const sid = req.cookies[cookieKey]
    if (!sid) {
        return res.status(401).send("Unauthorized, please login first.")
    }
    redis.hgetall(sid, function (err, userObj) {
        if (!userObj || !userObj['username']) {
            res.status(401).send("Can't find user session in redis.")
        } else {
            console.log("logged in")
            req.username=userObj['username']
            next()
        }
    })
}

const logout = (req, res)=> {
    if(req.isAuthenticated()){
        req.logout()
        res.status(200).send("OK")
        return
    }
    res.clearCookie(
        cookieKey,
        {maxAge: 0, httpOnly: true}
    )
    var sid = req.cookies[cookieKey]
    console.log(sid)
    redis.del(sid)
    res.status(200).send("OK")
}


//facebook login

var findByUsernameInUser = (username, callback)=> {
    User.find({ username }).exec(function(err, items) {
        callback(items);
    })
}

const clientSecret='7daaa5fc5b33035f8cacc33e87ab575f'
const clientID='242430559508605';
var islocal=true
const callbackURL = (islocal?'http://localhost:3000':'https://lh11webhw8ricebook.herokuapp.com')+'/auth/callback'
//const callbackURL="http://localhost:3000/auth/callback";
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

passport.use(new FacebookStrategy(config,
    function(token, refreshToken, profile, done){
        console.log(profile)
        console.log(profile.email)
        console.log(profile.picture)
        process.nextTick(function(){
            //register the facebook user in our system
            let username = profile.displayName+'@facebook'
            findByUsernameInUser(username, (items)=>{
                if(items.length===0){
                    new User({username:username, salt:null, hash: null, authtype:'facebook'}).save(()=>{
                        new Profile({username:username, email: null, zipcode: null, dob: null,
                            headline:"Welcome, facebook user! Post something new here!",
                            avatar:'https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg',
                            following: []}).save();
                    });
                }
            })
            return done(null, profile)
        })
    }
))

function facebookLogin(req, res){
    console.log(req.headers.referrer)
    res.redirect(req.headers.referer);
}

function profile(req, res){
    res.send({'Login success!': req.user})
}

const fail=(req, res) =>{
    res.send('fail to login for user: ', req.user)
}

module.exports = app => {
    app.use(session({secret: 'ThisIsMySecretMessageHowWillYouGuessIt'}))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(cookieParser());
    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}))
    app.get('/auth/callback', passport.authenticate('facebook', {failureRedirect : '/fail'}), facebookLogin)
    app.use(bodyParser.json())
    app.post('/login', login)
    app.post('/register', register)
    app.use(isLoggedIn)
    app.put('/password',putpassword)
    app.put('/logout', logout)
}