import React from 'react';
import '../styles/Header.css';
import Logo from '../assets/logo.svg'; 
import ProfileIcon from '../assets/profile.svg'; 

const Header = () => {
  return (
    <div className="header-container">
  <img src={Logo} alt="Logo" className="logo" />
  <nav className="nav-links">
    <a href="/movies">Movies</a>
    <a href="/television">Television</a>
    <a href="/animation">Animation</a>
    <a href="/forum">Forum</a>
    <a href="/my-lists">My Lists</a>
  </nav>
  <img src={ProfileIcon} alt="Profile Icon" className="profile-icon" />
</div>

  );
};

export default Header;

