const http = require('http');
const port = process.env.PORT || 2020;
const app = require('./app');

const server = http.createServer(app);
server.listen(port , () => {
    console.log('server is running on port ' + port);
});