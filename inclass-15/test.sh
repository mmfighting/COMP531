test

curl http://127.0.0.1:3333/
curl http://127.0.0.1:3333/articles
curl http://127.0.0.1:3333/login -H "Content-Type: application/json" -d '{"username":"sep1", "password":"foo" }'
curl http://127.0.0.1:3333/logout -X PUT
