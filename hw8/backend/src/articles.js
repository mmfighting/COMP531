const bodyParser = require('body-parser')
const Article = require('./model.js').Article
const User = require('./model.js').User
const uploadcloud = require('./uploadCloudinary')
const Profile = require('./model.js').Profile
const md5 = require('md5')

const addArticle = (req, res) => {
    console.log("req.text: " + req.text)
    console.log("req.img: " + req.fileurl)
    const newpost = {
        id: parseInt(md5(new Date().getTime())),
        author: req.username,
        img: req.fileurl,
        date: new Date().getTime(),
        text: req.body.text,
        comments: []
    }
    new Article(newpost).save((err, item)=> {
        res.send({articles: [item]})
    })
}

const loadArticle = (req, res) => {
    const post = {articles: []}
    if (req.params.id === undefined || req.params.id === null) {
        //only return current user and its following users' feed.
        // const userObj = getUser(req.user)
        // const usersToQuery = [ userObj.username, ...userObj.following ]
        // const articles = getArticlesByAuthors({ authors: usersToQuery, limit: 10 })
        let usersToQuery=[req.username]
        Profile.find({username: req.username}, function (err, item) {
            if (err || !item) {
                res.status(401).send('Mangoose error: find user error' + err)
            } else {
                const followlist = item[0].following
                console.log(req.username + " is following: "+followlist)
                usersToQuery = [req.username, ...followlist]
                console.log(...usersToQuery)
                Article.find().where('author').in(usersToQuery).
                sort({'date':-1}).limit(10).exec(function (err, items) {
                    items.forEach(function (article) {
                        post.articles.push(article)
                    })
                }).then(function () {
                    res.send(post)
                })
            }
        })
    } else {
        Article.find({_id: req.params.id}).exec(function (err, items) {
            items.forEach(function (article) {
                post.articles.push(article)
            })
        }).then(function () {
            res.send(post)
        })
    }
}

const putArticle = (req, res) => {
    console.log("put article req payload:")
    console.log(req.body)

    const id = req.params.id
    const commentId = req.body.commentId
    console.log("article _id: " + req.params.id)
    console.log("commentid: " + req.body.commentId)

    if (!commentId) {
        //update article body
        Article.findOneAndUpdate(
            {_id: id, author: req.username}, {text: req.body.text}, {new: true},
            (err, article) => {
                if (err) {
                    console.error('Mongoose update error: Article update failed due to ' + err)
                    res.status(500).send({error: err})
                } else if (!article) {
                    console.error('Mongoose update unauthorized: Article update unauthorized ' + id)
                    res.status(401).send({error: 'Forbidden to edit other\'s article'})
                } else {
                    console.log('Mongoose update success: update article ' + id)
                    res.json({articles: [article]})
                }
            })
    } else {
        if (commentId === -1) {
            //add a new comment to existing article with id: req.params.id
            Article.findOne({_id: id}).exec((err, item)=> {
                if (err || !item) {
                    res.status(401).send("Mongoose adding comment error: can\'t find article" + err)
                } else {
                    let newcomments = item.comments
                    newcomments.push({
                        commentId: parseInt(md5(new Date().getTime())),
                        author: req.username,
                        date: new Date(),
                        text: req.body.text
                    })
                    Article.findOneAndUpdate(
                        {_id: id}, {comments: newcomments}, {new: true},
                        (err, article) => {
                            if (err) {
                                console.error('Mongoose update error: Comments addition failed due to ' + err)
                                res.status(500).send({error: err})
                            } else if (!article) {
                                console.error('Mongoose update unauthorized: Comments addition unauthorized ' + id)
                                res.status(401).send({error: 'Forbidden to edit other\'s article'})
                            } else {
                                console.log('Mongoose update success: update article ' + id)
                                res.send({articles: [article]})
                            }
                        })
                }
            })
        } else {
            //update the comment
            Article.findOne({_id: id}).exec((err, item)=> {
                if (err == null && item != null) {
                    item.comments.forEach((comment)=> {
                        if (comment.commentId === commentId) {
                            comment.text = req.body.text
                            comment.date = new Date()
                            item.save((err)=> {
                                console.log("comment updated")
                                res.send({articles: [item]})
                            })
                        }
                    })
                }
            })
        }
    }
}

const hello = (req, res) => res.send({hello: 'world'})

module.exports = app => {
    app.use(bodyParser.json())
    app.post('/article', uploadcloud.uploadImage('article_img'), addArticle)
    app.get('/articles/:id*?', loadArticle)
    app.put('/articles/:id', putArticle)
    app.get('/', hello)
}