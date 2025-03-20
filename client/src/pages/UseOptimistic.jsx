import { useActionState, useOptimistic } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default function UseOptimistic() {
  const [state, actionFunction, isPending] = useActionState(handleSubmit, {
    error: null,
    data: {
      username: '',
      email: '',
      password: '',
    },
  });

  // Ensure optimisticState is never undefined
  const [optimisticState, setOptimisticState] = useOptimistic(
    state ?? { data: {} }
  );

  async function handleSubmit(prevState, formData) {
    const formObject = Object.fromEntries(formData.entries());
    setOptimisticState({ data: formObject, error: null });
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, formObject);
      return { data: data?.user || {}, error: null };
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

  if (state?.error) {
    return (
      <div className="w-full text-center mx-auto">
        ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️ ... {state.error} ... ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
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

      {state?.data?.username && (
        <div className="w-full text-center mx-auto">
          🎉🎉🎉🎉🎉🎉🎉🎉 ... Welcome {optimisticState.data.username} ...
          🎉🎉🎉🎉🎉🎉🎉🎉
        </div>
      )}

      {state?.data?.email && (
        <div className="w-full text-center mx-auto">
          📧📧📧📧📧📧📧📧 ... Email: {optimisticState.data.email} ...
          📧📧📧📧📧📧📧📧
        </div>
      )}

      {state?.data?.password && (
        <div className="w-full text-center mx-auto">
          🔒🔒🔒🔒🔒🔒🔒🔒 ... Password: {optimisticState.data.password} ...
          🔒🔒🔒🔒🔒🔒🔒🔒
        </div>
      )}
    </div>
  );
}
