#heroku
hanluada123

# test facebook login
curl -H 'Content-Type: application/json' http://localhost:3000//auth/facebook

# dummy server tester
curl https://webdev-dummy.herokuapp.com/headlines

curl -H 'Content-Type: application/json' https://webdev-dummy.herokuapp.com/login -d '{"username":"lh11", "password":"three-word-passphrase"}' -i

curl -H 'Content-Type: application/json' --cookie 'sessionId=12345; hash=222333444' https://webdev-dummy.herokuapp.com/headlines

curl -H 'Content-Type: application/json' --cookie 'sessionId=12345; hash=222333444' https://webdev-dummy.herokuapp.com/headline -X PUT -d '{ "headline":"A new headline!" }'


################################################################################
# local server
curl -H 'Content-Type: application/json' http://localhost:3000/

# database
MONGODB_URI="mongodb://heroku_hsdg2qhq:fbpigqmvumnl8dnbefjmv0rfqq@ds053678.mlab.com:53678/heroku_hsdg2qhq"

# server tester

# log in
curl -H 'Content-Type: application/json' http://localhost:3000/login -d '{"username":"lulu", "password":"mypassword"}' -i

# log out
curl -X PUT -H 'Content-Type: application/json' --cookie 'sid=4499ccacc927cf971fde6080c71883c9; Max-Age=3600; Path=/; Expires=Tue, 23 Nov 2016 23:56:10 GMT; HttpOnly' http://localhost:3000/logout

# post article


#!/bin/bash
PORT=3000

echo "GET /"
curl -H 'Content-Type: application/json' http://localhost:${PORT}
echo ""

echo "GET /articles"
curl -H 'Content-Type: application/json' --cookie 'sid=7d515fca3136d4d86d6af6b0a3582f4b; Max-Age=3600; Path=/; Expires=Tue, 23 Nov 2016 23:56:10 GMT; HttpOnly' http://localhost:3000/articles
echo ""

echo "GET /articles/:id?"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/articles/4
echo ""

echo "POST /article"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/article -d "{ \"body\":\"This is my new article! $(date)\" }"
echo ""

echo "POST /article"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/article -d "{ \"author\":\"Lu\", "\"body\":\"This is my test article!\" }"
echo ""

curl -H 'Content-Type: application/json' --cookie 'sessionId=12345; hash=222333444' http://localhost:3000/login

echo "change headline after logged in with session"
curl -H 'Content-Type: application/json' --cookie 'sid=7d515fca3136d4d86d6af6b0a3582f4b; Max-Age=3600; Path=/; Expires=Tue, 23 Nov 2016 23:56:10 GMT; HttpOnly' http://localhost:3000/headline -X PUT -d '{ "headline":"A new headline!" }'
echo " "

#get headline
curl -H 'Content-Type: application/json' --cookie 'sid=571973b8d28de0d628c47bdabce7d8fd; Max-Age=3600; Path=/; Expires=Tue, 23 Nov 2016 23:56:10 GMT; HttpOnly' http://localhost:3000/headlines/lulu

curl -H 'Content-Type: application/json' https://lh11ricebook.herokuapp.com/

curl -H 'Content-Type: application/json' http://localhost:3000/

mongodb://<dbuser>:<dbpassword>@ds159517.mlab.com:59517/lh11ricebook

mongodb://lh11:l;'@ds159517.mlab.com:59517/lh11ricebook

