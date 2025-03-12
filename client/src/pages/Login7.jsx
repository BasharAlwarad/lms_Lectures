import { useReducer } from 'react';
import useRenderCount from '../components/useRenderCount';
import axios from 'axios';

const initialState = {
  username: '',
  email: '',
  password: '',
  errors: {},
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors,
      };
    default:
      return state;
  }
}

export default function Login() {
  useRenderCount();

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', field: name, value });
  };

  const validate = () => {
    const errors = {};
    if (!state.username) errors.username = 'Username is required';
    if (!state.email) errors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(state.email))
      errors.email = 'Email is invalid';
    if (!state.password) errors.password = 'Password is required';
    // else if (state.password.length < 6 || state.password.length > 20)
    //   errors.password = 'Password must be between 6 and 20 characters';
    // else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,20}$/.test(state.password))
    //   errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', errors });
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/home/login', {
        username: state.username,
        email: state.email,
        password: state.password,
      });
      console.log(response.data);
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
  };

  return (
    <div>
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-sm mx-auto"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Login Form</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            value={state.username}
            onChange={handleChange}
          />
          {state.errors.username && (
            <span className="text-red-500 text-sm">
              {state.errors.username}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            value={state.email}
            onChange={handleChange}
          />
          {state.errors.email && (
            <span className="text-red-500 text-sm">{state.errors.email}</span>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            placeholder="******************"
            value={state.password}
            onChange={handleChange}
          />
          {state.errors.password && (
            <span className="text-red-500 text-sm">
              {state.errors.password}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
