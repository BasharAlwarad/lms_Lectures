import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import User from './pages/User';
import UpdateUser from './pages/UpdateUser';
import Signup from './pages/Signup';
import Login from './pages/Login';
import FileUpload from './pages/FileUpload';

import Nav from './components/Nav';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Nav />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/:id" element={<User />} />
            <Route path="/updateuser/:id" element={<UpdateUser />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/fileupload" element={<FileUpload />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
