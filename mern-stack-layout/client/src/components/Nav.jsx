import { Link } from 'react-router-dom';

import { useUser } from '../contexts/AuthContext';

const Nav = () => {
  const { user } = useUser();
  // const [user, setUser] = useState(
  //   JSON.parse(localStorage.getItem('user')) || null
  // );

  // const [user, setUser] = useState(null); // Initialize user state to null
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">welcome {user?.user[0]?.name}</h1>
        {/* <h1 className="text-xl font-bold">welcome {user?.user.name} </h1> */}
        <ul className="flex space-x-4">
          <li>
            <Link to="/">
              <button className="btn btn-primary btn-sm">Home</button>
            </Link>
          </li>
          <li>
            <Link to="/signup">
              <button className="btn btn-secondary btn-sm">Signup</button>
            </Link>
          </li>
          <li>
            <Link to="/login">
              <button className="btn btn-secondary btn-sm">Login</button>
            </Link>
          </li>
          <li>
            <Link to="/users">
              <button className="btn btn-accent btn-sm">Users</button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
