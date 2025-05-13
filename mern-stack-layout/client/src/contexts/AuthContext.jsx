import { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // setUser(JSON.parse(localStorage.getItem('user')) || null);

    const checkSession = async () => {
      const response = await axios.post(
        'http://localhost:8080/api/v1/users/login',
        {
          email: 'b@gmail.com',
          password: '123456',
        }
      );
      setUser(response.data);
      console.log(response.data);
    };

    checkSession();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  return context;
};
