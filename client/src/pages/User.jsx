import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function User() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  const APIURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${APIURL}users/user/${id}`);
        console.log(res.data);
        setUser(res.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Details</h2>
      <div className="bg-white p-4 rounded shadow">
        {user.user_image && (
          <img
            src={`${APIURL}usersImages/${user.user_image}`}
            alt="User"
            className="w-32 h-32 object-cover rounded-full mb-4"
          />
        )}
        <p>
          <strong>First Name:</strong> {user.first_name}
        </p>
        <p>
          <strong>Last Name:</strong> {user.last_name}
        </p>
        <p>
          <strong>Age:</strong> {user.age}
        </p>
      </div>
    </div>
  );
}

export default User;
