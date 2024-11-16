import React from 'react';
import '../styles/Header.css';
import Logo from '../assets/logo.svg'; 
import ProfileIcon from '../assets/profile.svg'; 

const Header = () => {
  return (
    <header className="header">
      <img src={Logo} alt="What to Watch" className="logo" />
      <nav className="nav">
        <a href="/movies">Movies</a>
        <a href="/television">Television</a>
        <a href="/animation">Animation</a>
        <a href="/forum">Forum</a>
        <a href="/my-lists">My Lists</a>
      </nav>
      <img src={ProfileIcon} alt="Profile" className="profile-icon" />
    </header>
  );
};

export default Header;

