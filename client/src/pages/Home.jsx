import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const APIURL = import.meta.env.VITE_API_URL;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${APIURL}users`);
        setUsers(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this user?'
    );

    if (!isConfirmed) return;

    try {
      await axios.delete(`${APIURL}users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <ul className="bg-white p-4 rounded shadow">
        {users.map((user) => (
          <li
            key={user.id}
            className="border-b p-2 last:border-none flex justify-between items-center"
          >
            <span>
              {user.first_name} - {user.last_name} - {user.age}
            </span>
            <div className="space-x-2">
              <Link
                to={`/user/${user.id}`}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
              >
                Read More
              </Link>
              <Link
                to={`/updateUser/${user.id}`}
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700"
              >
                Update
              </Link>
              <button
                onClick={() => deleteUser(user.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
