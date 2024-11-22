import React, { useState } from 'react';
import '../styles/MovieTitle.css';
import HeartIcon from '../assets/heart.svg'; 
import MenuDotsIcon from '../assets/heart.svg'; 

const MovieTitle = ({ studio, movieTitle, genre, movieCast, movies }) => {
  const [favorites, setFavorites] = useState({}); 

  // Toggle favorite status
  const toggleFavorite = (movieId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [movieId]: !prevFavorites[movieId],
    }));
  };

  return (
    <div className="movie-titles-container">
      <div className="list-thumbnail">
        <img src={movies[0]?.thumbnail || '../assets/test.jpg'} alt={movieTitle} className="thumbnail-image" />
      </div>
      <div className="movie-details">
        <p className="-movie-studio">{studio}</p>
        <h3 className="movie-title">{movieTitle}</h3>
        <p className="movie-genre">{genre}</p>
        <p className="cast-summary">Cast: {movieCast}</p>
      </div>
      <div className="title-actions">
        <button className="favorite-button" onClick={() => toggleFavorite(movieTitle)}>
          <img src={HeartIcon} alt="Favorite" className={`heart-icon ${favorites[movieTitle] ? 'favorited' : ''}`} />
        </button>
        <button className="menu-button">
          <img src={MenuDotsIcon} alt="Menu" className="menu-icon" />
        </button>
      </div>
    </div>
  );
};

export default MovieTitle;





