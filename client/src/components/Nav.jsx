import { NavLink } from 'react-router-dom';
import Cart from './Cart';

const Nav = () => {
  const active = ({ isActive }) =>
    isActive ? 'text-yellow-500 py-2' : 'text-white py-2';
  return (
    <nav className="bg-blue-500 w-full p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-white text-2xl font-bold">
          My Portfolio
        </NavLink>
        <div className="flex space-x-4">
          <NavLink to="/" className={active}>
            Home
          </NavLink>
          <NavLink to="/login" className={active}>
            Login
          </NavLink>
          <NavLink to="/products" className={active}>
            Products
          </NavLink>
          <Cart />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
