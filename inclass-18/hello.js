
const helloUser = (req, res) => {
	const user = req.params.user || 'Somebody'
	console.log("helloUser")
	console.log(user)
	res.send('Hello ' + user + '!')
}

module.exports = (app) => {
	app.get('/:user*?', helloUser)
}

