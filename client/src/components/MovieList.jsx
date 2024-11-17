import React, { useState } from 'react';
import '../styles/MovieList.css';
import HeartIcon from '../assets/heart.svg'; 
import MenuDotsIcon from '../assets/heart.svg'; 

const MovieList = ({ listTitle, user, genre, listSummary, movies }) => {
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
        <img src={movies[0]?.thumbnail || '../assets/test.jpg'} alt={listTitle} className="thumbnail-image" />
      </div>
      <div className="list-details">
        <p className="list-user">{user}</p>
        <h3 className="list-title">{listTitle}</h3>
        <p className="list-genre">{genre}</p>
        <p className="list-summary">Titles: {listSummary}</p>
      </div>
      <div className="list-actions">
        <button className="favorite-button" onClick={() => toggleFavorite(listTitle)}>
          <img src={HeartIcon} alt="Favorite" className={`heart-icon ${favorites[listTitle] ? 'favorited' : ''}`} />
        </button>
        <button className="menu-button">
          <img src={MenuDotsIcon} alt="Menu" className="menu-icon" />
        </button>
      </div>
    </div>
  );
};

export default MovieList;





