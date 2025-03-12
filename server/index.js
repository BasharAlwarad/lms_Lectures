import express from 'express';
import { PORT, MODE } from './config/config.js';
import bodyParser from 'body-parser';

const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/submit', (req, res) => {
  const { username, email, password } = req.body;
  console.log(`Username: ${username}, Email: ${email}, Password: ${password}`);

  // Send back the submitted data in a static HTML response
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Form Submission</title>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </head>
      <body class="bg-gray-100 flex items-center justify-center min-h-screen">
        <div class="bg-white p-6 rounded shadow-md w-full max-w-sm">
          <h2 class="text-2xl font-bold mb-4">Form Submitted</h2>
          <p class="mb-4"><strong>Username:</strong> ${username}</p>
          <p class="mb-4"><strong>Email:</strong> ${email}</p>
          <p class="mb-4"><strong>Password:</strong> ${password}</p>
          <a href="http://127.0.0.1:5500/vanilla/index.html" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Go Back</a>
        </div>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(
    `Server:🏃 MODE:${MODE == 'development' ? '🏠' : '🌐'}  port:${PORT}`
  );
});
