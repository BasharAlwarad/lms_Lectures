const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(403);
  res.end('Hello World');
});

server.listen(8080, () => {
  console.log('Server is running on port 8080');
});
