import { NavLink } from 'react-router-dom';

const Nav = () => {
  const active = ({ isActive }) =>
    isActive ? 'text-yellow-500 py-2' : 'text-white py-2';
  return (
    <nav className="bg-blue-500 p-4 h-screen w-2/16 fixed top-0 left-0">
      <div className="container mx-auto flex flex-col items-start">
        <NavLink to="/" className="text-white text-2xl font-bold mb-4">
          My Portfolio
        </NavLink>
        <div className="flex flex-col">
          <NavLink to="/" className={active}>
            Home
          </NavLink>
          <NavLink to="/login1" className={active}>
            traditional HTML
          </NavLink>
          <NavLink to="/login2" className={active}>
            useState for each input field
          </NavLink>
          <NavLink to="/login3" className={active}>
            useState with a single state
          </NavLink>
          <NavLink to="/login4" className={active}>
            useRef for each input field
          </NavLink>
          <NavLink to="/login5" className={active}>
            useRef for the entire form
          </NavLink>
          <NavLink to="/login6" className={active}>
            react-hook-form.
          </NavLink>
          <NavLink to="/login7" className={active}>
            useReducer for state management
          </NavLink>
          <NavLink to="/login8" className={active}>
            Formik library
          </NavLink>
          <NavLink to="/login9" className={active}>
            Recoil for state management
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
