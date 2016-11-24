// this is dbarticle.js 
const User = require('./model.js').User
const Profile = require('./model.js').Profile
const Article = require('./model.js').Article
const md5 = require('md5')

function find(req, res) {
    findByAuthor(req.params.user, function (items) {
        res.send({items})
    })
}

module.exports = (app) => {
    app.get('/find/:user', find)
}


function findByAuthor(author, callback) {
    Article.find({author: author}).exec(function (err, items) {
        console.log('There are ' + items.length + ' entries for ' + author)
        var totalLength = 0
        items.forEach(function (article) {
            totalLength += article.text.length
        })
        console.log('average length', totalLength / items.length)
        callback(items)
    })
}

function userByName(name, callback) {
    User.find({username: name}).exec(function (err, items) {
        console.log('There are ' + items.length + ' users with username ' + name)
        items.forEach(function (user) {
            console.log("The salt for " + name + " is " + user['salt'])
        })
        callback(items)
    })
}


function profileByName(name, callback) {
    Profile.find({username: name}).exec(function (err, items) {
        console.log('There are ' + items.length + ' profile with username ' + name)
        items.forEach(function (p) {
            console.log(name + " zipcode is  " + p['zipocode'])
        })
        callback(items)
    })
}

Profile.find({username: 'owl'}, function (err, item) {
    console.log(item)
    console.log("userobj.following:" + item[0]['following'])
    //item.following.push(req.params.user)
    console.log("followlist:" + item[0].following)
    //followlist = followlist.push()
    // Profile.findOneAndUpdate({username: req.username}, {following: []}, {new: true}, function (err) {
    //     if (!err) {
    //         res.send({username: req.username, following: followlist})
    //     } else {
    //         res.status(401).send("Error when updating following list")
    //     }
    // })
})