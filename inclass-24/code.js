var redis = requires('redis').createClient(process.env.REDIS_URL)
redis.hmset(sid, userObj)
redis.hgetall(sid, function(err, userObj){
	console.log(sid+' mapped to ' + userObj)
})