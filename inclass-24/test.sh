# test facebook login
curl -H 'Content-Type: application/json' http://localhost:3000//auth/facebook

# dummy server tester
curl https://webdev-dummy.herokuapp.com/headlines

curl -H 'Content-Type: application/json' https://webdev-dummy.herokuapp.com/login -d '{"username":"netid", "password":"three-word-passphrase"}' -i

curl -H 'Content-Type: application/json' --cookie 'sessionId=12345; hash=222333444' https://webdev-dummy.herokuapp.com/headlines

curl -H 'Content-Type: application/json' --cookie 'sessionId=12345; hash=222333444' https://webdev-dummy.herokuapp.com/headline -X PUT -d '{ "headline":"A new headline!" }'

# server tester

curl -H 'Content-Type: application/json' http://localhost:3000/login -d '{"username":"lh11", "password":"mypassword"}' -i

curl -X PUT -H 'Content-Type: application/json' --cookie 'sid=bb67df19e29a4b197f13591c50e8fc66; Max-Age=3600; Path=/; Expires=Tue, 15 Nov 2016 23:56:10 GMT; HttpOnly' http://localhost:3000/logout

curl -H 'Content-Type: application/json' --cookie 'sessionId=12345; hash=222333444' http://localhost:3000/login

curl -H 'Content-Type: application/json' --cookie 'sessionId=12345; hash=222333444' https://webdev-dummy.herokuapp.com/headline -X PUT -d '{ "headline":"A new headline!" }'
