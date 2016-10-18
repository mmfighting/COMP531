const express = require('express')
const bodyParser = require('body-parser')

var db = {
    "articles": [{"id": '1', "author": 'Lu', "text": 'A post'},
        {"id": '2', "author": 'Kate', "text": 'A long post'},
        {"id": '3', "author": 'Mike', "text": 'A short post'}]
}

var id = 4
var names =['Lucy', 'Kate', 'Julie', 'Bob', 'Mike', 'Steve']

const addArticle = (req, res) => {
    console.log('Payload received', req.body)
    var newpost = {"id": id, "author": names[id % 6], "text": req.body.text}
    id=id+1
    db.articles.push(newpost)
    res.send(JSON.stringify(newpost))
}

const loadArticle = (req, res) => {
    console.log('Payload received', req.body)
    res.send(JSON.stringify(db))
}

const hello = (req, res) => res.send({hello: 'world'})

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/articles', loadArticle)
app.get('/', hello)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
    const addr = server.address()
    console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
