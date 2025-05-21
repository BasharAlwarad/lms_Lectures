import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useUser } from '../contexts/AuthContext';

const Login = () => {
  const { user } = useUser();
  console.log(user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/users/login',
        formData
      );
      console.log('Login successful:', response.data);
      alert('Login successful!');
      setFormData({ email: '', password: '' }); // Reset form
      localStorage.setItem('user', JSON.stringify(response.data)); // Store user data in local storage
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="card w-96 bg-white shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        {user ? (
          <>
            <div className="alert alert-info shadow-lg mb-4">
              <div>
                <span>Already logged in as {user?.user[0]?.name}</span>
              </div>
            </div>
            ) : (
            <p className="text-gray-600 mb-4">Please enter your credentials.</p>
            )
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">
                {'Login'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
