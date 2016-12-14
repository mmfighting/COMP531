const Profile = require('./model.js').Profile
const User = require('./model.js').User

const getFollowing = (req, res)=> {
    const user = req.params.user ? req.params.user : req.username
    Profile.find({username: user}, function (err, userObjs) {
        console.log(userObjs)
        if (err || !userObjs) {
            res.status(401).send()
        } else {
            res.send({username: user, following: userObjs[0]['following']})
        }
    })
}

const putFollowing = (req, res)=> {
    const user=req.params.user
    User.find({username: user}, function(err, item){
        if(err||!item||item.length==0){
            Profile.find({username: req.username}, function (err, item) {
                if (err || !item) {
                    res.status(401).send('Mangoose error: put follower error' + err)
                } else {
                    res.send({username: req.username, following: item[0].following})
                }
            })
        }else{
            Profile.find({username: req.username}, function (err, item) {
                if (err || !item) {
                    res.status(401).send('Mangoose error: put follower error' + err)
                } else {
                    let followlist=item[0].following
                    followlist.push(user)
                    Profile.findOneAndUpdate({username: req.username}, {following: followlist}, {new: true}, function (err) {
                        if (!err) {
                            res.send({username: req.username, following: followlist})
                        } else {
                            res.status(401).send("Error when updating following list")
                        }
                    })
                }
            })
        }
    })
}

const deleteFollowing = (req, res)=> {
    const user = req.params.user
    if (!user) {
        res.status(401).send('Invalid input user name')
    }
    Profile.find({username: req.username}, function (err, userObjs) {
        if (err || !userObjs) {
            res.status(401).send()
        } else {
            let followlist = userObjs[0]['following']
            followlist = followlist.filter(function (follower) {
                return follower !== user
            })
            Profile.findOneAndUpdate({username: req.username}, {following: followlist}, {new: true}, function (err) {
                if (!err) {
                    res.send({username: user, following: followlist})
                } else {
                    res.status(401).send("Error when updating following list")
                }
            })
        }
    })

}

module.exports = app => {
    app.get('/following/:user?', getFollowing)
    app.put('/following/:user', putFollowing)
    app.delete('/following/:user', deleteFollowing)
}