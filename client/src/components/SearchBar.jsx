import React from 'react';
import '../styles/SearchBar.css';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="What do you feel like watching? Comedy, Action, Inspirational..."
      />
      <button>
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
};

export default SearchBar;
