import { useState } from 'react';
import axios from 'axios';

function Signup() {
  const APIURL = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState({ first_name: '', last_name: '', age: '' });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${APIURL}users`, user);
      console.log('User created:', res.data);
      setUser({ first_name: '', last_name: '', age: '' }); // Reset form after successful signup
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

export default Signup;
