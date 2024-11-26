import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

console.log(API_BASE_URL);
const AuthContext = createContext();

// Custom Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Persist user session using localStorage
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const userId = localStorage.getItem("user_id");
    const username = localStorage.getItem("username"); // Retrieve username
    const role = localStorage.getItem("role"); // Retrieve role
    if (token && userId && username && role) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser({ token, userId, username, role });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });
      const { access_token, userId, username, role } = response.data;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("user_id", userId);
      localStorage.setItem("username", username); // Store username
      localStorage.setItem("role", role); // Store role
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      setUser({ token: access_token, userId: userId, username, role });
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed");
      console.error(err);
    }
  };

  const signup = async (username, email, password, firstName, lastName) => {
    try {
      await axios.post(`${API_BASE_URL}/register`, {
        username,
        email,
        password,
        firstName,
        lastName,
      });
      await login(email, password); // Auto-login after signup
    } catch (err) {
      setError(err.response?.data?.detail || "Signup failed");
      console.error(err);
    }
  };

  // Remove the token, userId, and username from localStorage and axios headers
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("username"); // Clear username
    localStorage.removeItem("role"); // Clear role
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, signup, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
