var server = require('./server')(), // returns express instance
    wagner = require('wagner-core');

require('./schema/models')(wagner);

wagner.invoke(require('./auth'), { app: server });

server.use('/api/v1', require('./api')(wagner));

server.listen(3000);
console.log('Server listening on port 3000');
