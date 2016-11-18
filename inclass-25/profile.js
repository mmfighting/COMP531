var profiledb = {
    profiles: [
        {
            'username': 'Scott',
            'headline': 'This is my headline!',
            'email': 'foo@bar.com',
            'dob':'12/01/1980',
            'zipcode': 12345,
            'avatar': 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg'
        },
        {
            'username': 'Mike',
            'headline': 'Happy!',
            'email': 'mike@happy.com',
            'dob':'12/01/1990',
            'zipcode': 67890,
            'avatar': 'http://bootdey.com/img/Content/avatar/avatar6.png'
        }
    ]
}

const getHeadlines = (req, res) => {

    // we will want middleware to supply this value
    // for now we provide a default
    const users = req.params.user ? req.params.user.split(',') : ['Scott']

    // this returns only one headline, but we want to send
    // an array of all the requested user's headlines
    var headlines = []
    users.forEach((user)=> {
        profiledb.profiles.forEach((obj)=> {
            if (obj['username'] === user) {
                headlines.push({username: user, headline: obj['headline']})
            }
        })
    })
    if(headlines.length>0){
        res.send({headlines: headlines})
    }else{
        res.status(400).send('Invalid request. Registered users are Scott and Mike.')
    }
}

const getdob = (req, res)=> {
    var d = new Date('12/01/1992')
    res.send(d.getTime())
}
const putheadline = (req, res) => {
    res.send({headlines: [{username: 'Scott', status: req.body.headline || 'you did not supply headline'}]})
}

const index = (req, res) => {
    res.send({hello: 'world'})
}

const headlines = (req, res) => {
    res.send({headlines: [{username: 'Scott', status: 'Happy'}, {username: 'Mike', status: 'Sad'}]})
}

const email = (req, res) => {
    // we will want middleware to supply this value
    // for now we provide a default
    const users = req.params.user ? req.params.user.split(',') : ['Scott']

    // this returns only one headline, but we want to send
    // an array of all the requested user's headlines
    var emails = []
    users.forEach((user)=> {
        profiledb.profiles.forEach((obj)=> {
            if (obj['username'] === user) {
                emails.push({username: user, email: obj['email']})
            }
        })
    })
    if(emails.length>0){
        res.send({emails: emails})
    }else{
        res.send({emails: [{username: user, email: 'you@gmail.com'}]})
    }
}

const putemail = (req, res) => {
    res.send({username: 'Scott', email: req.body.email || 'you did not supply email'})
}

const zipcode = (req, res) => {
    const users = req.params.user ? req.params.user.split(',') : ['Scott']
    var zipcode = []
    users.forEach((user)=> {
        profiledb.profiles.forEach((obj)=> {
            if (obj['username'] === user) {
                zipcode.push({username: user, zipcode: obj['zipcode']})
            }
        })
    })

    if(emails.length>0){
        res.send({zipcode: zipcode})
    }else{
        res.send({zipcode: [{username: user, zipcode: '77005'}]})
    }
}

const putzipcode = (req, res) => {
    res.send({username: 'Scott', zipcode: req.body.zipcode || 'you did not supply zipcode'})
}

const avatars = (req, res) => {
    const users = req.params.user ? req.params.user.split(',') : ['Scott']

    var avatars = []
    users.forEach((user)=> {
        profiledb.profiles.forEach((obj)=> {
            if (obj['username'] === user) {
                avatars.push({username: user, avatar: obj['avatar']})
            }
        })
    })

    if(emails.length>0){
        res.send({avatars: avatars})
    }else{
        res.send({avatars: [{username: user, avatar: 'http://bootdey.com/img/Content/avatar/avatar6.png'}]})
    }
}

const uploadImage = require('../uploadCloudinary')

const uploadAvatar = (req, res) => {
    profiledb.profile[0]['avatar'] = req.fileurl ? req.fileurl : profiledb.profile[0]['avatar']
    const name=profiledb.profiles[0]['username']
    const url = profiledb.profile[0]['avatar']
    res.status(200).send({name, url})
}

module.exports = app => {
    app.get('/', index)
    app.get('/headlines/:user?', getHeadlines)
    app.put('/headline', putheadline)
    app.get('/dob', getdob)
    app.get('/email/:user?', email)
    app.put('/email', putemail)
    app.get('/zipcode/:user?', zipcode)
    app.put('/zipcode', putzipcode)
    app.get('/avatars/:user?', avatars)
    app.put('/avatar', uploadImage('avatar'), uploadAvatar)
}
