const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello HTTP!\n');
    res.writeHead(300, {'Content-Type': 'text/plain'});
    res.end('Hello Mark Dave\n');    
});

server.listen(3000, () =>
    console.log('Server on http://localhost:3000'));