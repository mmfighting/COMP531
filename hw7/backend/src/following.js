const Profile = require('./model.js').Profile

const getFollowing = (req, res)=> {
    const user = req.params.user ? req.params.user : req.username
    Profile.find({username: user},function(err, userObjs){
        console.log(userObjs)
        if(err || !userObjs){
            res.status(401).send()
        }else{
            res.send({username: user, following: userObjs[0]['following']})
        }
    })
}

const putFollowing = (req, res)=> {
    const user = req.params.user ? req.params.user : req.username

    Profile.find({username:user}, function(err, userObjs){
        if(err||!userObjs){
            res.status(401).send('Invalid input user name')
        }else{
            let followlist=userObjs[0]['following']
            followlist.push(user)
            Profile.findOneAndUpdate({username:user}, {following: followlist}, function(err){
                if(!err){
                    res.send({username: user, following: followlist})
                }else{
                    res.status(401).send("Error when updating following list")
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

    Profile.find({username: req.username}, function (err, userObjs){
        if(err||!userObjs){
            res.status(401).send()
        }else{
            let followlist=userObjs[0]['following']
            followlist.filter(function(follower){
                return follower!==user
            })
            Profile.findOneAndUpdate({username:user}, {following: followlist}, function(err){
                if(!err){
                    res.send({username: user, following: followlist})
                }else{
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