import  { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;  
const AuthContext = createContext();

// Custom Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Persist user session using localStorage
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });
      const { access_token } = response.data;
      localStorage.setItem('access_token', access_token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      setUser({ token: access_token });
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
      console.error(err);
    }
  };

  
  const signup = async (username, email, password) => {
    try {
      await axios.post(`${API_BASE_URL}/register`, {
        username,
        email,
        password,
      });
      await login(email, password); // Auto-login after signup
    } catch (err) {
      setError(err.response?.data?.detail || 'Signup failed');
      console.error(err);
    }
  };

  // remove the token from localStorage and axios headers
  const logout = () => {
    localStorage.removeItem('access_token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
