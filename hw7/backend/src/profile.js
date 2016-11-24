const Profile = require('./model.js').Profile

const index = (req, res) => {
    res.send({hello: 'world'})
}

const getHeadlines = (req, res) => {
    const users = req.params.user ? req.params.user.split(',') : [req.username]

    let headlines = []
    users.forEach((user)=> {
        Profile.find({username: user}, function(err, usrObj){
            if(err){
                res.status(401).send("uid is invalid, can't get its email")
            }else{
                headlines.push({username: user, headline: usrObj[0]['headline']})
                if(headlines.length===users.length){
                    res.send({headlines: headlines})
                }
            }
        })
    })
}

const putheadline = (req, res) => {
    Profile.findOneAndUpdate({username: req.username}, {headline: req.body.headline || 'you did not supply headline'}, function(err){
        if(!err){
            res.send({username: req.username, headline: req.body.headline || 'you did not supply headline'})
        }else{
            res.status(401).send("error updating headline.")
        }
    })
}

const email = (req, res) => {
    const user = req.params.user ? req.params.user : req.username
    Profile.find({username: user}).exec((err, usrObj)=>{
        if(err){
            res.status(401).send("uid is invalid, can't get its email")
        }else{
            res.send({username: user, email: usrObj[0]['email']})
        }
    })
}

const putemail = (req, res) => {
    Profile.findOneAndUpdate({username: req.username}, {email: req.body.email || 'you did not supply email'}, function(err){
        if(err){
            res.status(401).send("error: can't put email")
        }else{
            res.send({username: req.username, email: req.body.email || 'you did not supply email'})
        }
    })
}


const getdob = (req, res)=> {
    Profile.find({username: req.username}).exec((err, usrObj)=>{
        if(err){
            res.status(401).send("uid is invalid, can't get its email")
        }else{
            console.log(usrObj[0]['dob'])
            console.log(usrObj[0]['dob'].getTime())
            res.send({username: req.username, dob: usrObj[0]['dob'].getTime()})
        }
    })
}


const zipcode = (req, res) => {
    Profile.find({username: req.username}).exec((err, usrObj)=>{
        if(err){
            res.status(401).send("uid is invalid, can't get its zipcode")
        }else{
            res.send({username: req.username, zipcode: usrObj[0]['zipcode']})
        }
    })
}

const putzipcode = (req, res) => {
    Profile.findOneAndUpdate({username: req.username}, {zipcode: req.body.zipcode || 'you did not supply zipcode'}, function(err){
        if(err){
            res.status(401).send("error: can't put zipcode for some reason")
        }else{
            res.send({username: req.username, zipcode: req.body.zipcode || 'you did not supply zipcode'})
        }
    })
}

const avatars = (req, res) => {
    const users = req.params.user ? req.params.user.split(',') : [req.username]

    var avatars = []
    users.forEach((user)=> {
        Profile.find({username: user}, function(err, usrObj){
            if(err){
                res.status(401).send("uid is invalid, can't get its email")
            }else{
                avatars.push({username: user, avatar: usrObj[0]['avatar']})
                if(avatars.length===users.length){
                    res.send({avatars: avatars})
                }
            }
        })
    })
}

const upload = require('../uploadCloudinary')

const uploadAvatar = (req, res) => {
    Profile.findOneAndUpdate({username:req.username}, {avatar: req.fileurl}, function(err){
        if(err){
            res.status(401).send()
        }else{
            res.status(200).send({username: req.username, avatar: req.fileurl})
        }
    })
}

module.exports = app => {
    app.get('/', index)
    app.get('/headlines/:user?', getHeadlines)
    app.put('/headline', putheadline)
    app.get('/dob', getdob)
    app.get('/email/:user?', email)
    app.put('/email',putemail)
    app.get('/zipcode/:user?', zipcode)
    app.put('/zipcode', putzipcode)
    app.get('/avatars/:user?', avatars)
    app.put('/avatar', upload.uploadImage('avatar'), uploadAvatar)
}
