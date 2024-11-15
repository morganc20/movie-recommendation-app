import React from 'react';
import '../styles/Header.css';
import Logo from '../assets/logo.svg';

const Header = () => {
  return (
    <header className="header">
      <img src={Logo} alt="What to Watch Logo" className="logo" />
      <nav>
        <a href="#movies">Movies</a>
        <a href="#television">Television</a>
        <a href="#animation">Animation</a>
        <a href="#forum">Forum</a>
        <a href="#my-lists">My Lists</a>
      </nav>
      <div className="profile-icon">
        <i className="fas fa-user-circle"></i>
      </div>
    </header>
  );
};

export default Header;
