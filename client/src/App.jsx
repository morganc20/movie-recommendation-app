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
import Admin from "./pages/Admin";
import Movie from "./pages/Movie.jsx";
import Television from "./pages/Television.jsx";
import Animation from "./pages/Animation.jsx";
import MyLists from "./pages/MyLists.jsx";
import ModeratorDashboard from "./pages/Moderator.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Title from "./pages/Title.jsx";
import Profile from "./pages/Profile.jsx";
import CreateList from "./pages/CreateList.jsx";

// Protected Route for authenticated users
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

// Protected Route for Admin users
const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  return user && user.role === "admin" ? children : <Navigate to="/" />;
};

// Protected Route for Moderator or Admin users
const ModeratorRoute = ({ children }) => {
  const { user } = useAuth();
  return user && (user.role === "moderator" || user.role === "admin") ? (
    children
  ) : (
    <Navigate to="/" />
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/title/:titleId" element={<Title />} />
          {/* <Route path="/movie" element={<Movie />} /> */}
          <Route path="/television" element={<Television />} />
          <Route path="/animation" element={<Animation />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createList" element={<CreateList />} />

          <Route
            path="/"
            element={
            <Movie />
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-lists"
            element={
              <PrivateRoute>
                <MyLists />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          /> */}

          {/* <Route
            path="/CreateList"
            element={
              <PrivateRoute>
                <CreateList />
              </PrivateRoute>
            }
          /> */}

          {/* Moderator and Admin Protected Routes */}
          <Route
            path="/moderator"
            element={
              <ModeratorRoute>
                <ModeratorDashboard />
              </ModeratorRoute>
            }
          />

          {/* Admin Protected Routes */}
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
