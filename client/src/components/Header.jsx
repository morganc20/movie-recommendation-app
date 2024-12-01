import React, { useState } from 'react';
import '../styles/Header.css';
import Logo from '../assets/logo.svg';
import ProfileIcon from '../assets/profile.svg';

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleProfileClick = () => {
    if (window.innerWidth > 768) {
      window.location.href = '/profile';
    } else {
      toggleSidebar();
    }
  };

  return (
    <div className="header-container">
      <img src={Logo} alt="Logo" className="logo" />
      <nav className="nav-links">
        <a href="/movie">Movies</a>
        <a href="/television">Television</a>
        <a href="/animation">Animation</a>
        <a href="/forum">Forum</a>
        <a href="/my-lists">My Lists</a>
      </nav>
      <img
        src={ProfileIcon}
        alt="Profile Icon"
        className="profile-icon"
        onClick={handleProfileClick}
      />

      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={toggleSidebar}>
          &times;
        </button>
        <nav className="sidebar-links">
        <a href="/profile">Profile</a> 
        <a href="/my-lists">My Lists</a>
          <a href="/movie">Movies</a>
          <a href="/television">Television</a>
          <a href="/animation">Animation</a>
          <a href="/forum">Forum</a>
        </nav>
      </div>
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
        onClick={toggleSidebar}
      ></div>
    </div>
  );
};

export default Header;
