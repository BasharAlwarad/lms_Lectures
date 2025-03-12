import { config } from 'dotenv';
config();

const PORT = process.env.PORT;
const MODE = process.env.NODE_ENV;

export { PORT, MODE };
