import axios from 'axios';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

const API_URL = import.meta.env.VITE_API_URL;

export default function UseActionState() {
  const [
    {
      data: { username, email, password },
      error,
    },
    actionFunction,
    isPending,
  ] = useActionState(handleSubmit, {
    loading: false,
    error: null,
    data: {
      username: '',
      email: '',
      password: '',
    },
  });

  async function handleSubmit(prevState, formData) {
    try {
      const formObject = Object.fromEntries(formData.entries());
      console.log('Form submitted:', formObject);
      const { data } = await axios.post(`${API_URL}auth/login`, formObject);
      return { data: data?.user, error: null };
    } catch (error) {
      return { ...prevState, error: error.message };
    }
  }

  if (isPending) {
    return (
      <div className="w-full text-center mx-auto">
        🤖🤖🤖🤖🤖🤖🤖🤖 ... LOADING ... 🤖🤖🤖🤖🤖🤖🤖🤖
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center mx-auto">
        ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️ ... {error} ... ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
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
          {/* <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button> */}
          <SubmitButton>Sign In</SubmitButton>
        </div>
      </form>
      {username && (
        <div className="w-full text-center mx-auto">
          🎉🎉🎉🎉🎉🎉🎉🎉 ... Welcome {username} ... 🎉🎉🎉🎉🎉🎉🎉🎉
        </div>
      )}
      {email && (
        <div className="w-full text-center mx-auto">
          📧📧📧📧📧📧📧📧 ... Email: {email} ... 📧📧📧📧📧📧📧📧
        </div>
      )}
      {password && (
        <div className="w-full text-center mx-auto">
          🔒🔒🔒🔒🔒🔒🔒🔒 ... Password: {password} ... 🔒🔒🔒🔒🔒🔒🔒🔒
        </div>
      )}
    </div>
  );
}

function SubmitButton({ children, ...rest }) {
  const { pending, data, method, action } = useFormStatus();
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="submit"
      disabled={pending}
      {...rest}
    >
      {pending ? 'Submitting...' : children}
    </button>
  );
}
