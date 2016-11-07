;
var followingdb = [{
    username: 'Lucy',
    following: ['Amy', 'Julie', 'Mike']
}, {
    username: 'Amy',
    following: ['Lucy', 'Julie', 'Mike']
}]

const getFollowing = (req, res)=> {
    if (!user) {
        user = 'Lucy'
    }
    var followed = followingdb.filter((follow)=> {
        follow.username === user
    })
    if (!followed) {
        res.status(401).send('The user requested does not exist')
    }
    res.status(200).send(followed[0].following)
}

const putFollowing = (req, res)=> {
    if (!user) {
        res.status(401).send('Invalid input user name')
    }
    var followed = followingdb.filter((follow)=> {
        follow.username === 'Lucy'
    })
    var following = followed[0].following
    if (following.filter((u)=> {
            u === user
        }).length > 0) {
        res.status(401).send('User is already in the following list of current user')
    }
    following.push(user)
    res.status(200).send('User has been added to the following list')
}

const deleteFollowing = (req, res)=> {
    if (!user) {
        res.status(401).send('Invalid input user name')
    }
    var followed = followingdb.filter((follow)=> {
        follow.username === 'Lucy'
    })
    var following = followed[0].following
    if (following.filter((u)=> {
            u === user
        }).length > 0) {
        followed[0].following = following.filter((u)=> {
            u != user
        })
        res.status(200).send('User has been successfully deleted from following list')
    }
    else {
        res.status(401).send('User is not in following list')
    }

}

module.exports = app => {
    app.get('/following/:user?', getFollowing)
    app.put('/following/:user', putFollowing)
    app.delete('/following/:user', deleteFollowing)
}