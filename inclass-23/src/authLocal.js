const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
const md5 = require('md5')


var cookieKey = 'sid'
var db = {users: []}
var aPW = md5(['job_offer', 'mypassword'].join(':'))
var sessionUser={}
db.users.push({'username': 'lh11', 'password': aPW, 'salt': 'job_offer'})

const register = (req, res) => {
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

const login = (req, res) => {
    var username = req.body.username
    var password = req.body.password
    if (!username || !password) {
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

    sessionUser[cookieKey]={'username': req.body.username}

    var msg = {username: username, result: 'Login success'}
    res.send(msg)
}


const password = (req, res)=>{
    var username = req.body.username
    if (!username || !password) {
        res.status(400).send("invalid input")
        return
    }
    var userObj = getUser(username)
    var userSalt = userObj.salt
    var newpassword = md5([userSalt, password].join(':'))

    if (!userObj) {
        res.status(401).send("user does not exist")
        return
    }
    userObj.password=newpassword
    var msg = {username: username, result: 'Password updated'}
    res.send(msg)
}

function isLoggedIn(req, res, next) {
    var sid = req.cookies[cookieKey]
    if (!sid) {
        return res.status(401).send()
    }

    var username = sessionUser[sid]
    if (username) {
        req.username = username
        next()
    } else {
        res.status(401).send()
    }
}

const logout = (req, res)=>{
    res.clearCookie(
        cookieKey,
        {maxAge: 0, httpOnly: true}
    )
    var sid = req.cookies[cookieKey]
    delete sessionUser[sid]
    res.status(200).send("you are successfully logged out")
}

module.exports = app => {
    app.use(bodyParser.json())
    app.use(cookieParser())
    app.post('/login', login)
    app.post('/register', register)
    app.put('/password', isLoggedIn, password)
    app.put('/logout', isLoggedIn, logout)
}