import { useFormik } from 'formik';
import useRenderCount from '../components/useRenderCount';
import * as Yup from 'yup';
import axios from 'axios';

export default function Login() {
  useRenderCount();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password must be 20 characters or less')
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,20}$/,
          'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        ),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          'http://localhost:8080/home/login',
          values
        );
        console.log(response.data);
      } catch (error) {
        console.error('There was an error submitting the form!', error);
      }
    },
  });

  return (
    <div>
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-sm mx-auto"
        onSubmit={formik.handleSubmit}
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
            {...formik.getFieldProps('username')}
          />
          {formik.touched.username && formik.errors.username ? (
            <span className="text-red-500 text-sm">
              {formik.errors.username}
            </span>
          ) : null}
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
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <span className="text-red-500 text-sm">{formik.errors.email}</span>
          ) : null}
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
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password ? (
            <span className="text-red-500 text-sm">
              {formik.errors.password}
            </span>
          ) : null}
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
