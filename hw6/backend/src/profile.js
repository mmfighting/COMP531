var profiledb = {
    profiles: [
        {
            username: 'Scott',
            headline: 'This is my headline!',
            email: 'foo@bar.com',
            zipcode: 12345,
            avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg'
        },
        {
            'username': 'Mike',
            headline: 'Happy!',
            email: 'mike@happy.com',
            zipcode: 67890,
            avatar: 'http://bootdey.com/img/Content/avatar/avatar6.png'
        }
    ]
}

const getHeadlines = (req, res) => {

    // we will want middleware to supply this value
    // for now we provide a default
    if (!req.user) req.user = 'Scott'

    const users = req.params.users ? req.params.users.split(',') : [req.user]

    // this returns only one headline, but we want to send
    // an array of all the requested user's headlines
    var headlines = []
    users.forEach((user)=> {
        var userObj = profiledb.profiles.filter((profile)=> {
            profile.username === user
        })
        if (!userObj) {
            headlines.push({username: user, headline: userObj[0].headline})
        }
    })

    res.send({
        headlines: headlines
    })

}

const getdob = (req, res)=> {
    var d = new Date('12/01/1992')
    res.send(d.getMilliseconds())
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
    if (user) {
        res.send({'username': user, email: 'youremail@gg.com'})
    }
    res.send({username: 'Scott', email: 'Happy@kk.com'})
}

const putemail = (req, res) => {
    res.send({username: 'Scott', email: req.body.email || 'you did not supply email'})
}

const zipcode = (req, res) => {
    if(!user){
        res.send({username: user, zipcode: '13579'})
        return
    }
    else{
        res.send({username: 'Scott', zipcode: '29348'})
    }
}

const putzipcode = (req, res) => {
    res.send({username: 'Scott', zipcode: req.body.zipcode || 'you did not supply zipcode'})
}

const avatars = (req, res) => {
    res.send({avatars: [{username: 'Scott', avatar: 'https://scott.profile.url.jpg'}, {username: 'Mike', avatar: 'https://mike.profile.url.jpg'}]})
}

const putavatar = (req, res) => {
    res.send({avatars: {username: 'Scott', avatar: req.body.avatar || 'you did not supply the url'}})
}

module.exports = app => {
    app.get('/', index)
    app.get('/:user?', index)
    app.get('/headlines/:user?', getHeadlines)
    app.put('/headline', putheadline)
    app.get('/dob/:user?', email)
    app.put('/email', putemail)
    app.get('/email/:user?', email)
    app.put('/email', putemail)
    app.get('/zipcode/:user?', zipcode)
    app.put('/zipcode', putzipcode)
    app.get('/avatars/:user?', avatars)
    app.put('/avatar', putavatar)
    app.get('/dob', getdob)
}
