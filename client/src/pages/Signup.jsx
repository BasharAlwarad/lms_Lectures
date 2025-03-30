import { useState } from 'react';
import axios from 'axios';

function FileUpload() {
  const APIURL = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    age: '',
    user_email: '',
    user_password: '',
    user_image: null, // Add user image field
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setUser((prevState) => ({
        ...prevState,
        [name]: files[0], // Store the selected file
      }));
    } else {
      setUser((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('first_name', user.first_name);
      formData.append('last_name', user.last_name);
      formData.append('age', user.age);
      formData.append('user_email', user.user_email);
      formData.append('user_password', user.user_password);
      if (user.user_image) {
        formData.append('user_image', user.user_image); // Append image if provided
      }

      const res = await axios.post(`${APIURL}auth/signup`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('User created:', res.data);

      // Reset form after successful signup
      setUser({
        first_name: '',
        last_name: '',
        age: '',
        user_email: '',
        user_password: '',
        user_image: null,
      });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow space-y-4"
      >
        <div>
          <label className="block font-semibold">First Name</label>
          <input
            type="text"
            name="first_name"
            value={user.first_name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={user.last_name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Age</label>
          <input
            type="number"
            name="age"
            value={user.age}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            name="user_email"
            value={user.user_email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Password</label>
          <input
            type="password"
            name="user_password"
            value={user.user_password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Profile Image</label>
          <input
            type="file"
            name="user_image"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default FileUpload;
