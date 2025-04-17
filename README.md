# Setting Up a Main Layout for a MERN Stack Project

This guide walks you through creating a basic MERN stack project with the following tools and libraries:

- **Backend**: `express`, `cors`, `dotenv`, `nodemon`, `ES6`,
- **Frontend**: `vite`, `react-router-dom`, `axios`

## Step 1: Initialize the Project

1. Create a new directory for your project and navigate into it:

   ```bash
   mkdir mern-stack-layout
   cd mern-stack-layout
   ```

## Step 2: Set Up the Backend

1. Create a server folder and add an `index.js` `.env` and `.gitignore` files:

   ```bash
   mkdir server
   cd server
   touch index.js .env .gitignore
   ```

2. Initialize a new Node.js project:

   ```bash
   npm init -y
   ```

3. Install backend dependencies:

   ```bash
   npm install express cors dotenv
   npm install --save-dev nodemon
   ```

4. add the global variables to `.env`:

```env
PORT=5000
MODE=development
```

5. add ES6 types to `package.json`:

```json
"type": "module",
```

6. Add a start and dev script to package.json:

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

7. add the `.env` and `node_modules` to `.gitignore`:

```md
node_modules
.env
```

8. Add a basic Express server in server/index.js:

   ```js
   import express from 'express';
   import cors from 'cors';
   import dotenv from 'dotenv';

   dotenv.config();

   const app = express();
   const PORT = process.env.PORT;
   const MODE = process.env.MODE;

   app.use(cors());
   app.use(express.json());

   app.get('/', (req, res) => {
     res.send('Server is running');
   });

   app.get(/.*/, (req, res) => {
     res.status(404).send("Page doesn't exist");
   });

   app.listen(PORT, () => {
     console.log(`Server is 🏃 in ${MODE} mode on ${PORT}`);
   });
   ```

9. Run the server:

```bash
npm run dev
```

## Step 3: Set Up the Frontend

1. Navigate back to the root directory and create a Vite React app:

```bash
mkdir client
cd client
npm create vite@latest client --template react
npm install
```

2. Install frontend dependencies:

```bash
npm install axios react-router-dom
```

3. Create folder pages, components, contexts in src:

```bash
mkdir src/pages src/components src/contexts
```

1. Add Home page to pages and Nav and Footer to components:

```bash
touch src/pages/Home.jsx src/components/Nav.jsx src/components/Footer.jsx
```

```jsx
// src/pages/Home.jsx
const Home = () => {
  return <h1>Welcome to the MERN Stack App</h1>;
};

export default Home;

// src/components/Nav.jsx
const Nav = () => {
  return <nav>Navigation Bar</nav>;
};

export default Nav;

// src/components/Footer.jsx
const Footer = () => {
  return <footer>Footer Content</footer>;
};

export default Footer;
```

1. Set up React Router in client/src/App.jsx:

```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
```

## Step 4: Test the Application

- Start the backend server:

  ```bash
  npm run dev
  ```

- Start the frontend development server:

  ```bash
  npm run dev
  ```

- Open your browser and navigate to `http://localhost:5173` for the frontend and `http://localhost:5000` for the backend.

## Step 5: Build routing system in the server.

1. create the controllers.

```bash
code controllers/userControllers.js
```

2. create the routes.

```bash
code routes/userRoutes.js
```

3. create basic CRUD in `userControllers.js`

```js
export const getAllUsers = (req, res) => {
  res.json({ message: 'Get all users' });
};
export const getUserById = (req, res) => {
  res.json({ message: 'Get one users' });
};
export const createUser = (req, res) => {
  res.json({ message: 'create users' });
};
export const updateUser = (req, res) => {
  res.json({ message: 'update users' });
};
export const deleteUser = (req, res) => {
  res.json({ message: 'delete users' });
};
```

4. create routes in `userRoutes.js`

```js
import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userControllers.js';

const router = Router();

router.get('/', getAllUsers);
router.post('/', createUser);

router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
```

5. add the user route to `index.js`

```js
import userRoutes from './routes/userRoutes.js';

app.use(`/api/v1/users`, userRoutes);
```

6. crate a project on mongodb atlas. make sure to take the URI and the secret Key

7. add the secret key to `.env`

8. install mongodb and mongoose.

´´´bash
npm i mongodb mongoose
´´´

9. create a `db/db.js` and establish connection with atlas throw mongoose.

```js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB is connected...');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  }
}

connectToDatabase();

export { mongoose };
```

10. import the connection to `index.js`

```js
import './db/db.js';
```

11. create your schemas in the model folder

```bash
code models/userModel.js
```

- create the schema of user

```js
import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model('User', userSchema);
```

12. update your controllers to interact with the new schema

```js
import User from '../models/userModel.js';

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};
```

## Final Project Structure

structure the controllers by adding CRUD functions.

```
mern-stack-layout/
├── client/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── contexts/
│   │   ├── contexts/
│   │   │   ├── authContext.jsx
│   │   ├── components/
│   │   │   ├── Footer.jsx
│   │   │   ├── Nav.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── vite.config.js
├── server/
│   ├── controllers/
│   │   ├── userControllers.jsx
│   ├── db/
│   │   ├── db.jsx
│   ├── models/
│   │   ├── userModel.jsx
│   ├── node_modules/
│   ├── routes/
│   │   ├── userRoutes.jsx
│   ├── .env
│   ├── .gitignore
│   ├── index.js
│   ├── package-lock.json
│   ├── package.json
├── README.md
```
