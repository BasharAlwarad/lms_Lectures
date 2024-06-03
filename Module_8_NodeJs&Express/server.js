// const http = require('http');
// const cors = require('cors');

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'application/json' });

//   const responseJSON = { message: 'Hello World' };

//   res.end(JSON.stringify(responseJSON));
// });

// server.use(cors());

// server.listen(8080, () => {
//   console.log('Server is running on port 8080');
// });
const http = require('http');

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow specific HTTP methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers

  // Set response headers
  res.writeHead(200, { 'Content-Type': 'application/json' });

  // Prepare and send response
  const responseJSON = { message: 'Hello World' };
  res.end(JSON.stringify(responseJSON));
});

server.listen(8080, () => {
  console.log('Server is running on port 8080');
});
