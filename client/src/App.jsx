// import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Home from './pages/Home.jsx';
import Forum from './pages/Forum.jsx'
import Admin from './pages/Admin';
import Movie from './pages/Movie.jsx';
import Television from './pages/Television.jsx';
import Animation from './pages/Animation.jsx';
import MyLists from './pages/MyLists.jsx';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Title from './pages/Title.jsx';



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
          <Route path="/title" element={<Title />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/television" element={<Television />} />
          <Route path="/animation" element={<Animation />} />
          <Route path="/my-lists" element={<MyLists />} />
          <Route path="/title" element={<Title />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
