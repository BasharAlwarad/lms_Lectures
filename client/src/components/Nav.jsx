import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">User Management</h1>
        <div className="flex space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-white font-semibold border-b-2 border-white'
                : 'text-gray-200 hover:text-white'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? 'text-white font-semibold border-b-2 border-white'
                : 'text-gray-200 hover:text-white'
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              isActive
                ? 'text-white font-semibold border-b-2 border-white'
                : 'text-gray-200 hover:text-white'
            }
          >
            Signup
          </NavLink>
          <NavLink
            to="/fileupload"
            className={({ isActive }) =>
              isActive
                ? 'text-white font-semibold border-b-2 border-white'
                : 'text-gray-200 hover:text-white'
            }
          >
            File Upload
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
