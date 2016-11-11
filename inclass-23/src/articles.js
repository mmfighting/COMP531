const bodyParser = require('body-parser')

var db = {
    "articles": [{"id": '1', "author": 'Lu', "text": 'A post'},
        {"id": '2', "author": 'Kate', "text": 'A long post'},
        {"id": '3', "author": 'Mike', "text": 'A short post'}]
}

var id = 4
var names =['Lucy', 'Kate', 'Julie', 'Bob', 'Mike', 'Steve']

const addArticle = (req, res) => {
    var newpost = {"id": id, "author": names[id % 6], "text": req.body.text}
    id=id+1
    db.articles.push(newpost)
    res.send(newpost)
}

const loadArticle = (req, res) => {
    if(req.params.id===undefined||req.params.id===null){
        res.send(db)
    }else{
        var post = db.articles.filter((article)=>{return article.id===req.params.id})
        res.send(post)
    }
}


const hello = (req, res) => res.send({hello: 'world'})


module.exports = app => {
    app.use(bodyParser.json())
    app.post('/article', addArticle)
    app.get('/articles/:id?', loadArticle)
    app.get('/', hello)
}