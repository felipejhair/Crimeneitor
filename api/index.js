var express = require('express'), // returns express instance
    app = express(),
    wagner = require('wagner-core');

require('./schema/models')(wagner);

app.use(express.static('./public', { maxAge: 4 * 60 * 60 * 1000 /* 4 hours? */ }));

wagner.invoke(require('./auth'), { app: app });

app.use('/api/v1', require('./api')(wagner));

app.listen(3000);
console.log('Server listening on port 3000');
