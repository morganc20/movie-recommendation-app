// import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import Forum from "./pages/Forum.jsx";
import ModeratorDashboard from "./pages/Moderator.jsx";
import Admin from "./pages/Admin.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  // TODO: Add AdminRoute
  const { user } = useAuth();
  return user && user.role === "admin" ? children : <Navigate to="/" />;
};

const ModeratorRoute = ({ children }) => {
  // TODO: Add ModeratorRoute
  const { user } = useAuth();
  return user && user.role === "moderator" ? children : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forum" element={<Forum />} />
          <Route
            path="/moderator"
            element={
              <ModeratorRoute>
                <ModeratorDashboard />
              </ModeratorRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
