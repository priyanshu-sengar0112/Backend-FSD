
const http = require('http');

// Create HTTP server
const server = http.createServer((req, res) => {

    // Set status code
    res.statusCode = 200;

    // Set response headers
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('X-Powered-By', 'Node.js');

    // Send response
    res.end('Hello World');

});

// Start server on port 3000
server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});




 