
const index = (req, res) => {
     res.send({ hello: 'world' })
}

const headlines = (req, res) => {
          res.send({ headlines: [{username: 'Scott', status: 'Happy'}, {username: 'Mike', status: 'Sad'}]})
}
const putheadline = (req, res) => {
     res.send({ headlines: [{username: 'Scott', status: req.body.headline||'you did not supply headline'}]})
}


const email = (req, res) => {
     res.send({username: 'Scott', email: 'Happy@kk.com'})
}

const putemail = (req, res) => {
     res.send({username: 'Scott', email: req.body.email||'you did not supply email'})
}

const zipcode = (req, res) => {
     res.send({username: 'Scott', zipcode: '29348'})
}

const putzipcode = (req, res) => {
     res.send({username: 'Scott', zipcode: req.body.zipcode||'you did not supply zipcode'})
}

const avatars = (req, res) => {
     res.send({ avatars: [{username: 'Scott', avatar: 'url'}, {username: 'Mike', avatar: 'url'}]})
}

const putavatar = (req, res) => {
     res.send({ avatars: {username: 'Scott', avatar: req.body.avatar||'you did not supply the url'}})
}

module.exports = app => {
     app.get('/', index)
     app.get('/:user?', index)
     app.get('/headlines/:user?', headlines)
     app.put('/headline', putheadline)
     app.get('/email/:user?', email)
     app.put('/email', putemail)
     app.get('/zipcode/:user?', zipcode)
     app.put('/zipcode', putzipcode)
     app.get('/avatars/:user?', avatars)
     app.put('/avatar', putavatar)
}
