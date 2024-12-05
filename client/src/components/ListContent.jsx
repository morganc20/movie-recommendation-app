import React, { useState } from 'react';
import '../styles/ListContent.css';
import HeartIcon from '../assets/heart.svg'; 
import MenuDotsIcon from '../assets/white-menu-dots.jpg'; 
import ListDropdown from '../components/ListDropdown.jsx';

const ListContent = ({ studio, movieTitle, genre, movieCast, movies, listIndex }) => {
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
        <span className="movie-index">{listIndex}</span>
        <p className="-movie-studio">{studio}</p>
        <h3 className="movie-title">{movieTitle}</h3>
        <p className="movie-genre">{genre}</p>
        <p className="cast-summary">Cast: {movieCast}</p>
      </div>
      <div className="title-actions">
        <button className="favorite-button" onClick={() => toggleFavorite(movieTitle)}>
          <img src={HeartIcon} alt="Favorite" className={`heart-icon ${favorites[movieTitle] ? 'favorited' : ''}`} />
        </button>
        <ListDropdown
                        buttonLabel="Add to List"
                        options={[
                            { label: 'Add to Space Wizards', href: '#a' },
                            { label: 'Add to Nostalgia', href: '#b' },
                            {label: 'Create New List'}
                        ]}
                        buttonStyle={{ backgroundColor: '#f1dac4', color: 'black' }}
                        menuStyle={{ backgroundColor: '#f1dac4' }}
                    />
                    <p>20 votes </p>
      </div>
    </div>
  );
};

export default ListContent;





