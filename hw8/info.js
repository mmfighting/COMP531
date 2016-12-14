//////////////////////////////
// # heroku
// https://lh11finalserver.herokuapp.com/

//////////////////////////////
// # database test user:
// user: lh11
// l;'

//////////////////////////////
// # database test user:
// user: test
// 123

//////////////////////////////
// Example in database

new Article({ id: 1, author: 'sep1', img: null, date: new Date().getTime(), text: 'This is my first article'}).save()
new Article({ id: 2, author: 'sep1', img: null, date: new Date().getTime(), text: 'This is my second article'}).save()
new Article({ id: 3, author: 'jmg3', img: null, date: new Date().getTime(), text: "This is Max's article"}).save(function() {
     console.log('done with save')
     Article.find().exec(function(err, items) {
          console.log("There are " + items.length + " articles total in db")

          findByAuthor('sep1', function() {
              findByAuthor('jmg3', function() {
                  console.log('complete')
                  process.exit()
              })
          })
     })
})

//////////////////////////////
// remove the above example code
//////////////////////////////


const aPW = md5(['job_offer', 'mypassword'].join(':'))
const bPW = md5(['new_friend', 'mypassword'].join(':'))

new User({'username': 'lulu', 'hash': aPW, 'salt': 'job_offer'}).save()
new User({'username': 'mike', 'hash': bPW, 'salt': 'new_friend'}).save(function(){
    console.log('done with save init users')
    User.find().exec(function(err, items) {
        console.log("There are " + items.length + " users total in db")

        userByName('lulu', function() {
            userByName('mike', function() {
                console.log('complete')
                process.exit()
            })
        })
    })
})

new Profile({'username': 'lulu',
    'headline': 'This is my headline!',
    'following': ['mike'],
    'email': 'foo@bar.com',
    'dob':'12/01/2000',
    'zipcode': 12345,
    'avatar': 'https://3.bp.blogspot.com/-pXfrxi7dcV0/VsBXKE_10LI/AAAAAAAABmI/GrWunW0D0QY/s1600/cute%2Blittle%2Bgirls%2Bprofile%2Bpic%2Bwallpaper%2B%25283%2529.jpg'
}).save()

new Profile({'username': 'mike',
    'headline': 'Happy!',
    'following': ['lulu'],
    'email': 'mike@happy.com',
    'dob':'12/01/1990',
    'zipcode': 23456,
    'avatar': 'http://bootdey.com/img/Content/avatar/avatar6.png'
}).save(function(){
    console.log('done with save profiles')
    Profile.find().exec(function(err, items) {
        console.log("There are " + items.length + " profiles total in db")
        items.forEach(function(item){
            console.log("User "+item['username']+" is registered with email "+ item['email'])
        })
        process.exit()
    })
})

User.remove({username: 'lulu'}).exec()
User.remove({username: 'mike'}).exec()
userByName('lulu', function(){})
userByName('mike', function(){})



Profile.remove({username: 'lulu'}).exec()
Profile.remove({username: 'mike'}).exec()
profileByName('lulu', function(){})
profileByName('mike', function(){
    process.exit()
})


////////////////////////////////////////////////////////////////////////
const putpassword = (req, res)=> {
    var username = req.username
    var password = req.body.password
    console.log("update password for user: "+ username)
    console.log("new password:"+password)
    if (!username || !password) {
        res.status(400).send("invalid input")
        return
    }
    User.find({username: name}, function(err, usrObj){
        if(!err){
            const userSalt=usrObj[0]['salt']
            const newpassword=md5([userSalt, password].join(':'))
            User.findOneAndUpdate({username: username},{hash: newpassword},function(err){
                if(!err){
                    var msg = {username: username, status: 'Password updated'}
                    res.send(msg)
                }else{
                    res.status(400).send(err)
                }
            }).exec()
        }else{
            res.status(400).send(err)
        }
    })
}
////////////////////////////////////////////////////////////////////////

new Profile({'username': 'newbe',
    'headline': 'a new headline',
    'following': [],
    'email': 'req.body.email',
    'dob':'req.body.email',
    'zipcode': 'req.body.zipcode',
    'avatar': 'https://www.drupal.org/files/profile_default.png'
}).save(function(){
    console.log("Profile of "+"newbe"+" created.")
    //res.status(200).send({result: "success", username: username})
})

new Profile({'username': 'newbe',
    'headline': 'This is my headline!',
    'following': ['mike'],
    'email': 'foo@bar.com',
    'dob':'12/01/2000',
    'zipcode': 12345,
    'avatar': 'https://www.drupal.org/files/profile_default.png'
}).save(function(){
    console.log('done with save profiles')
    Profile.find().exec(function(err, items) {
        console.log("There are " + items.length + " profiles total in db")
        items.forEach(function(item){
            console.log("User "+item['username']+" is registered with email "+ item['email'])
        })
        process.exit()
    })
})