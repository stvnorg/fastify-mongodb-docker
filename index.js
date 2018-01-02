const fastify = require('fastify')()

fastify.register(require('fastify-mongodb'), {
	url: 'mongodb://localhost:27017/platform'
})

fastify.get('/user/:id', function(request, reply) {
	const { db } = fastify.mongo;
	db.collection('users', onCollection)
	
	function onCollection (err, col) {
		if (err) return reply.send(err);
		console.log(parseInt(request.params.id));
		col.findOne({ id: parseInt(request.params.id) }, (err, user) => {
			reply.type('text/html');
			if (user) reply.send(user.name);
			else reply.send("User not found!");
		});
	}
})

fastify.post('/user/', function(request, reply) {
	const { db } = fastify.mongo;
	db.collection('users', onCollection)
	
	function onCollection(err, col) {
		if (err) return reply.send(err);
		col.insertOne({ id: parseInt(request.body.id), name: request.body.name }, (err, response) => {
			reply.send(response);
		});
	}
	console.log(request.body);
})

fastify.get('/', function(request, reply) {
	reply.type('text/html');
	reply.send('Hello World!, from fastify');
})

fastify.listen(3333, function(err) {
	if (err) throw err
	fastify.log.info(`server listening on ${fastify.server.address().port}`);
})
