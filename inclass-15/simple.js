var http = require('http')

var host = '127.0.0.1'
var port = 3333

http.createServer(preprocess).listen(port, host)
console.log('Server running at http://' + host + ':' + port)

function preprocess(req, res) {
    var body = ''
    req.on('data', function (chunk) {
        body += chunk
    })
    req.on('end', function () {
        req.body = body
        server(req, res)
    })
}

function server(req, res) {
    console.log('Request method        :', req.method)
    console.log('Request URL           :', req.url)
    console.log('Request content-type  :', req.headers['content-type'])
    console.log('Request payload       :', req.body)


    var payload
    var articles = {"articles":
            [{"id": '1', "author": 'Lu', "body": 'A post'},
            {"id": '2', "author": 'Kate', "body": 'A long post'},
            {"id": '3', "author": 'Mike', "body": 'A short post'}]
    }
    res.setHeader('Content-Type', 'application/json')
    switch (req.url) {
        case "/":
            if (req.method === 'GET') {
                payload = {'hello': 'world'}
                break
            }
        case "/articles":
            if (req.method === 'GET') {
                payload = articles
                break
            }
        case "/login":
            if (req.method === 'POST') {
                var uname = JSON.parse(req.body)["username"]
                var upassword = JSON.parse(req.body)["password"]
                if (uname != '' && upassword != '') {
                    payload = {"username": uname, "result": 'success'}
                    break
                }
            }
        case "/logout":
            if (req.method === 'PUT') {
                payload = "OK"
                break
            }
        default:
            console.log ("your input is invalid")
    }
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(JSON.stringify(payload))
}
