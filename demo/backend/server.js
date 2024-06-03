import readline from 'readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('What is your question: \n', (answer) => {
  console.log(answer);
  rl.close();
});

// import express from 'express';
// import cors from 'cors';
// import apiRouter from './router.js';
// const app = express();

// app.use(cors());

// app.use(express.json());

// app.use('/', apiRouter);

// app.listen(8080, () => {
//   console.log('Server is listening on port 8080');
// });
