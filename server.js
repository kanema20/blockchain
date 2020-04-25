const http = require('http');
const app = require('./app'); //express app qualifies as a request handler

const port = process.env.PORT || 3005;

const server = http.createServer(app);

server.listen(port);

console.log(`server running on port ${port}`)
