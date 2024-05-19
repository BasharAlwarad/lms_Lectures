import http from 'http';
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  res.writeHead(200, { 'Content-Type': 'application/json' });

  const responseJSON = { message: 'Hello World' };
  res.end(JSON.stringify(responseJSON));
});

server.listen(8080, () => {
  console.log('Server is running on port 8080');
});
