import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [deleteInput, setDeleteInput] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const getAllUsers = async () => {
    const { data } = await axios.get('http://localhost:8080/');
    setData(data);
  };

  const addUser = async (event) => {
    event.preventDefault();

    const { data } = await axios.post('http://localhost:8080/', {
      name,
      email,
    });

    console.log('User added:', data);
    setName('');
    setEmail('');
  };

  const deleteUser = async (userId) => {
    const response = await axios.delete(`http://localhost:8080/${userId}`);
    setDeleteInput('');
    console.log('User deleted:', response.data);
  };

  const getUserById = async (userId) => {
    const { data } = await axios.get(`http://localhost:8080/${userId}`);
    console.log(data);
    searchInput('');
  };

  const handelFindUser = (e) => {
    e.preventDefault();
    getUserById(searchInput);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteUser(deleteInput);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <h1>Hello from frontend</h1>
      <form onSubmit={handelFindUser}>
        <input
          type='text'
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
        />
        <button>Search for user</button>
      </form>
      <hr />
      <form onSubmit={handleDelete}>
        <input
          type='text'
          onChange={(e) => setDeleteInput(e.target.value)}
          value={deleteInput}
        />
        <button>Delete a user</button>
      </form>

      <ul>
        {data?.map((e) => (
          <li key={e.id}>{e.name}</li>
        ))}
      </ul>
      <form onSubmit={addUser}>
        <input
          placeholder='name'
          type='text'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder='email'
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type='submit'>Add User</button>
      </form>
    </div>
  );
}

export default App;
