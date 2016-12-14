const express = require('express')
const bodyParser = require('body-parser')
const cloudinary = require('./src/uploadCloudinary')
const middleware = (req, res, next)=>{
	var origin=req.headers.origin
	res.set('Access-Control-Allow-Credentials', true)
	res.set('Access-Control-Allow-Headers', 'Authorization, Content-Type, X-Requested-With, Origin')
	res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
	res.set('Access-Control-Allow-Origin', origin)
	if(req.method==='OPTIONS'){
		res.status(200).send()	
	}else{
		next()
	}
}

if (process.env.NODE_ENV !== "production") {
	require('dotenv').load()
}

const app = express()
app.use(bodyParser.json())
app.use(middleware)
require('./src/auth')(app)
require('./src/profile')(app)
require('./src/articles')(app)
require('./src/following')(app)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
