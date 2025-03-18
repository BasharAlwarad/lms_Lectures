import express, { json } from 'express';
import cors from 'cors';
import { PORT, MODE } from './config/config.js';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware to enable CORS
app.use(json());
app.use(cors());

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/home', (req, res) => {
  const { username, email, password } = req.body;

  console.log(`Username: ${username}, Email: ${email}, Password: ${password}`);

  // Send the static HTML file as a response
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.post('/auth/login', (req, res) => {
  console.log({ ...req.body });

  // Send the static HTML file as a response
  res.json({
    message: 'Form submitted successfully!',
    user: { ...req.body },
  });
});

app.listen(PORT, () => {
  console.log(
    `Server:🏃 MODE:${MODE == 'development' ? '🏠' : '🌐'}  port:${PORT}`
  );
});
