// import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Home from './pages/Home.jsx';
import Forum from './pages/Forum.jsx'
import ModeratorDashboard from './pages/ModeratorDashboard.jsx'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";



const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/mod" element={<ModeratorDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
