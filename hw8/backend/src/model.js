// this is model.js 
var mongoose = require('mongoose')
require('./db.js')

var userSchema = new mongoose.Schema({
	username: String,
	salt: String,
	hash: String,
	authtype: String
})

var profileSchema = new mongoose.Schema({
	username: String,
	headline: String,
	following: [String],
	email: String,
	dob: Date,
	zipcode: String,
	avatar: String
})

var commentSchema = new mongoose.Schema({
	commentId: Number,
	author: String,
	date: Date,
	text: String
})
var articleSchema = new mongoose.Schema({
	id: Number,
	author: String,
	img: String,
	date: Date,
	text: String,
	comments: [ commentSchema ]
})

exports.User=mongoose.model('user', userSchema)
exports.Profile=mongoose.model('profile', profileSchema)
exports.Article = mongoose.model('article', articleSchema)