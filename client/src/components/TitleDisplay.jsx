import React, { useState } from 'react';
import '../Styles/TitleDisplay.css';
import HeartIcon from '../assets/heart.svg'; 
import MenuDotsIcon from '../assets/heart.svg'; 

const TitleDisplay = ({ title, director, genre, cast, movieImage }) => {
  const [favorites, setFavorites] = useState({}); 

  // Toggle favorite status
  const toggleFavorite = (movieId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [movieId]: !prevFavorites[movieId],
    }));
  };

  return (
    <div className="movie-list-container">
      <div className="list-thumbnail">
      <img src={movieImage || '../assets/test.jpg'} alt={title} className="thumbnail-image" />
      </div>
      <div className="list-details">
        <p className="list-director">{director}</p>
        <h3 className="list-title">{title}</h3>
        <p className="list-genre">{genre}</p>
        <p className="list-cast">Titles: {cast}</p>
      </div>
      <div className="list-actions">
        <button className="favorite-button" onClick={() => toggleFavorite(title)}>
          <img src={HeartIcon} alt="Favorite" className={`heart-icon ${favorites[title] ? 'favorited' : ''}`} />
        </button>
        <button className="menu-button">
          <img src={MenuDotsIcon} alt="Menu" className="menu-icon" />
        </button>
      </div>
    </div>
  );
};

export default TitleDisplay;