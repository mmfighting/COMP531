// this is dbarticle.js 
const User = require('./model.js').User
const Profile = require('./model.js').Profile
const Article = require('./model.js').Article
const md5 = require('md5')

function find(req, res) {
     findByAuthor(req.params.user, function(items) {
          res.send({items})
     })
}

module.exports = (app) => {
     app.get('/find/:user', find)
}


function findByAuthor(author, callback) {
	Article.find({ author: author }).exec(function(err, items) {
		console.log('There are ' + items.length + ' entries for ' + author)
		var totalLength = 0
		items.forEach(function(article) {
			totalLength += article.text.length
		})
		console.log('average length', totalLength / items.length)		
		callback(items)
	})
}

function userByName(name, callback){
    User.find({username: name}).exec(function(err, items){
        console.log('There are ' + items.length + ' users with username ' + name)
        items.forEach(function(user) {
            console.log("The salt for " +  name +" is "+ user['salt'])
        })
        callback(items)
    })
}


function profileByName(name, callback){
    Profile.find({username: name}).exec(function(err, items){
        console.log('There are ' + items.length + ' profile with username ' + name)
        items.forEach(function(p) {
            console.log(name +" zipcode is  "+ p['zipocode'])
        })
        callback(items)
    })
}


User.remove({username: 'newbe'}).exec()
Profile.remove({username: 'newbe'}).exec()
userByName('newbe', function(){})
profileByName('newbe', function(){})