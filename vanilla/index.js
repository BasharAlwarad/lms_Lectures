import { createServer } from 'http';
import { readFile } from 'fs';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const server = createServer((req, res) => {
  let requestedUrl = req.url === '/' ? 'index.html' : req.url;
  let filePath = join(__dirname, 'public', requestedUrl);

  let ext = extname(filePath);

  if (!ext) {
    filePath += '.html';
    ext = '.html';
  }

  let contentType = 'text/html';
  if (ext === '.css') contentType = 'text/css';

  readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      return;
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
