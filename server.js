const http = require('http');
const app = require('./app');

const port = process.env.PORT;

app.set('port', port);
const server = http.createServer(app);

server.listen(port, () => {
    if (port == 3000) {
        console.log('Nick Buzzy Portfolio server started', port)
    }
});