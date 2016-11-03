const express = require('express')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
const md5 = require('md5')

var cookieKey = 'sid'
var db = {users: []}
var aPW = md5(['job_offer', 'mypassword'].join(':'))
db.users.push({'username': 'lu', 'password': aPW, 'salt': 'job_offer'})


function register(req, res) {
    console.log("payload received", req.body)
    var username = req.body.username
    var password = req.body.password
    var salt = [Date.now(), username].join(':')
    if (!username || !password) {
        res.status(400).send("Invalid input")
        return
    }
    if(!getUser(username)){
        res.status(400).send("username already exist!")
        return
    }
    var newpassword = md5([salt, password].join(':'))
    db.users.push({username, 'password': newpassword}, salt)
    res.status(200).send("register success!")
}

function getUser(name) {
    var result = db.users.filter((user)=> {
        return user.username === name
    })
    if (result.length === 1) {
        return result[0]
    } else {
        return false
    }
}

function generateCode(userObj){
    var username=userObj.username
    var code=[Date.now(),username].join(':')
    return md5(code)
}

function login(req, res) {
    var username = req.body.username
    var password = req.body.password
    if (!username || !req.body.password) {
        res.status(400).send("invalid input")
        return
    }
    var userObj = getUser(username)
    var userSalt = userObj.salt
    var newpassword = md5([userSalt, password].join(':'))

    if (!userObj || userObj.password !== newpassword) {
        res.status(401).send("wrong credentials")
        return
    }

    res.cookie(
        cookieKey,
        generateCode(userObj),
        {maxAge: 3600 * 1000, httpOnly: true}
    )
    var msg = {username: username, result: 'Login success'}
    res.send(msg)
}

const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
app.post('/login', login);
app.post('/register', register);

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
    const addr = server.address()
    console.log(`Server listening at http://${addr.address}:${addr.port}`)
})