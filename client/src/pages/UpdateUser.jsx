import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UpdateUser() {
  const { id } = useParams();
  const APIURL = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState({ first_name: '', last_name: '', age: '' });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${APIURL}users/${id}`);
        setUser(res.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${APIURL}users/${id}`, user);
      setUser(res.data);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Update User</h2>
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
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update User
        </button>
      </form>
    </div>
  );
}

export default UpdateUser;
