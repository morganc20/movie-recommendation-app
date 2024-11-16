import React, { useState } from 'react';
import '../styles/SearchBar.css';
import SearchIcon from '../assets/search.svg'; 

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState(''); 

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value); 
  };

  const handleSearch = () => {
    console.log(`Search for: ${searchQuery}`); 
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="What do you feel like watching? Comedy, Action, Inspirational..."
          value={searchQuery} 
          onChange={handleInputChange} 
          style={{ color: '#F1DAC4' }} 
        />
        <button className="search-button" onClick={handleSearch}>
          <img src={SearchIcon} alt="Search" className="search-icon" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;




