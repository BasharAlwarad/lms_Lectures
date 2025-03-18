import { useState, useActionState } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export default function UseActionState() {
  const [{ username, email, password }, actionFunction, isPending] =
    useActionState(handleSubmit, {
      username: '',
      email: '',
      password: '',
    });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(prevState, formData) {
    try {
      setLoading(true);
      const formObject = Object.fromEntries(formData.entries());
      const { data } = await axios.post(`${API_URL}/auth/login`, formObject);
      if (!isPending) {
        setLoading(false);
      }
      return data?.user;
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
      console.log({ username, email, password });
    }
  }
  if (loading) {
    return (
      <div className="w-full text-center mx-auto">
        🤖🤖🤖🤖🤖🤖🤖🤖 ... LOADING ... 🤖🤖🤖🤖🤖🤖🤖🤖
      </div>
    );
  }

  return (
    <div>
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-sm mx-auto"
        action={actionFunction}
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
          />
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
          />
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
          />
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
