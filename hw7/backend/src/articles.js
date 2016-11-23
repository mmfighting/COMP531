const bodyParser = require('body-parser')
const Article = require('./model.js').Article
const ObjectId = require('mongoose').Types.ObjectId

let id = 4

const addArticle = (req, res) => {
    console.log("req.text: "+req.text)
    console.log("req.body: "+req.body)
    console.log("req.body.text: "+req.body.text)
    const newpost = { id: id, author: req.username, img: null, date: new Date().getTime(), text: req.body.text, comments: []}
    id=id+1
    new Article(newpost).save((err,item)=>{
        res.send({articles: [item]})
    })
}

const loadArticle = (req, res) => {
    const post={articles: []}
    if(req.params.id===undefined||req.params.id===null){
        Article.find().exec(function(err,items){
            items.forEach(function(article){
                post.articles.push(article)
            })
        }).then(function(){
            res.send(post)
        })
    }else{
        Article.find({id: req.params.id}).exec(function(err, items){
            items.forEach(function(article){
                post.articles.push(article)
            })
        }).then(function(){
            res.send(post)
        })
    }
}

const putArticle = (req, res) => {
    console.log("put article req payload:")
    console.log(req.body)

    const id = req.params.id
    const commentId = req.body.commentId

    if(!commentId){
        //update article body
        Article.findOneAndUpdate(
            {_id:id, author:req.username}, {text:req.body.text}, {new:true},
            (err, article) => {
                if (err) {
                    console.error('Mongoose update error: Article update failed since ' + err)
                    res.status(500).send({error:err})
                } else if (!article) {
                    console.error('Mongoose update unauthorized: Article update unauthorized ' + id)
                    res.status(401).send({error: 'Fobidden to edit other\'s article'})
                } else {
                    console.log('Mongoose update success: update article ' + id)
                    res.json({articles:[article]})
                }
            })
    }else{
        if(commentId===-1){
            //add a new comment to existing article with id: req.params.id
            Article.findOneAndUpdate(
                {_id:id, comments:{$elemMatch: {commentId, author:req.username}}},
                {$set:{"comments.$.text":req.body.text}},
                {new:true}, (err, article) => {
                    if (err) {
                        console.error('Mongoose update error: comment update failed since ' + err)
                        res.status(500).send({error:err})
                    } else if (!article) {
                        console.error('Mongoose update unauthorized: comment update unauthorized ' + commentId)
                        res.status(401).send({error: 'Fobidden to edit other\'s comment'})
                    } else {
                        console.log('Mongoose update success: update comment ' + commentId)
                        res.json({articles:[article]})
                    }
                })
        }else{
            //update the comment
            const newComment = {
                author: req.username,
                date: new Date(),
                text: req.body.text,
                commentId: md5(new Date() + req.username)
            }

            Article.findOneAndUpdate(
                {_id:id}, {$push:{comments:newComment}}, {new:true},
                (err, article) => {
                    if (err) {
                        console.error('Mongoose update error: comment update failed since ' + err)
                        res.status(500).send({error:err})
                    } else if (!article) {
                        console.log('Mongoose findOne bad request: Article findOne for ' + id)
                        res.status(400).send({error: 'can\'t finde article ' + id})
                    } else {
                        console.log('Mongoose update success: update comment ' + newComment.commentId)
                        res.json({articles:[article]})
                    }
                }
            )
        }
    }
}

const hello = (req, res) => res.send({hello: 'world'})

module.exports = app => {
    app.use(bodyParser.json())
    app.post('/article', addArticle)
    app.get('/articles/:id*?', loadArticle)
    app.put('/articles/:id', putArticle)
    app.get('/', hello)
}