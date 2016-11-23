const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const User = require('./model.js').User
const Profile = require('./model.js').Profile
const md5 = require('md5')
const redis = require('redis').createClient("redis://h:p233u15m27m5s54ns3ti7dt6rpb@ec2-54-83-63-242.compute-1.amazonaws.com:11509")
let cookieKey = 'sid'

const register = (req, res) => {
    const salt = [Date.now(), req.body.username].join(':')
    const newpassword = md5([salt, req.body.password].join(':'))
    if (!req.body.username || !req.body.password) {
        res.status(401).send("Invalid input")
        return
    }
    User.find({username: req.body.username}, function(err, obj){
        if(obj.length>0){
            res.status(401).send("username already exist!")
        }
    })
    User.find({username: req.body.username}, function(err, obj){
        if(obj.length>0){
            res.status(401).send("username already exist!")
        }
    })

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

function generateCode(userObj) {
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

        const sid = generateCode(userObj)

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
    User.find({username: name}, function(err, usrObj){
        if(!err){
            const userSalt=[Date.now(), req.body.username].join(':')
            const newpassword=md5([userSalt, password].join(':'))
            User.findOneAndUpdate({username: username},{ salt: userSalt , hash: newpassword}, function(err){
                if(!err){
                    var msg = {username: username, status: 'Password updated'}
                    res.send(msg)
                }else{
                    res.status(401).send(err)
                }
            })
        }else{
            res.status(401).send(err)
        }
    })
}

function isLoggedIn(req, res, next) {
    console.log("checking whether user is local logged in...")
    const sid = req.cookies[cookieKey]
    if (!sid) {
        return res.status(401).send("Please login first.")
    }
    redis.hgetall(sid, function (err, userObj) {
        if (!userObj) {
            res.status(401).send("Can't find user session in redis.")
        } else {
            console.log("logged in")
            req.username=userObj['username']
            next()
        }
    })
}

const logout = (req, res)=> {
    res.clearCookie(
        cookieKey,
        {maxAge: 0, httpOnly: true}
    )
    var sid = req.cookies[cookieKey]
    console.log(sid)
    redis.del(sid)
    res.status(200).send("OK")
}

module.exports = app => {
    app.use(bodyParser.json())
    app.use(cookieParser())
    app.post('/login', login)
    app.post('/register', register)
    app.use(isLoggedIn)
    app.put('/password',putpassword)
    app.put('/logout', logout)
}