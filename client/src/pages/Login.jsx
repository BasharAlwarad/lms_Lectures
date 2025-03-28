import { useState } from 'react';
import axios from 'axios';

function Login() {
  const APIURL = import.meta.env.VITE_API_URL;
  const [credentials, setCredentials] = useState({
    user_email: '',
    user_password: '',
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${APIURL}auth/login`, credentials);
      console.log('Login successful:', res.data);
    } catch (error) {
      console.error('Error logging in:', error.response?.data || error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow space-y-4"
      >
        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            name="user_email"
            value={credentials.user_email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Password</label>
          <input
            type="password"
            name="user_password"
            value={credentials.user_password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
