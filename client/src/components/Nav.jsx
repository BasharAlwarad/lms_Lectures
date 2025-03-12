import { NavLink } from 'react-router-dom';

const Nav = () => {
  const active = ({ isActive }) =>
    isActive ? 'text-yellow-500 px-4' : 'text-white px-4';
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-white text-2xl font-bold">
          My Portfolio
        </NavLink>
        <div>
          <NavLink to="/" className={active}>
            Home
          </NavLink>
          <NavLink to="/login1" className={active}>
            Login1
          </NavLink>
          <NavLink to="/login2" className={active}>
            Login2
          </NavLink>
          <NavLink to="/login3" className={active}>
            Login3
          </NavLink>
          <NavLink to="/login4" className={active}>
            Login4
          </NavLink>
          <NavLink to="/login5" className={active}>
            Login5
          </NavLink>
          <NavLink to="/login6" className={active}>
            Login6
          </NavLink>
          <NavLink to="/login7" className={active}>
            Login7
          </NavLink>
          <NavLink to="/login8" className={active}>
            Login8
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
