import React, { useState } from 'react';
import '../styles/MovieList.css';
import HeartIcon from '../assets/heart.svg';
import MenuDotsIcon from '../assets/white-menu-dots.jpg';
import ListDropdown from '../components/ListDropdown.jsx';

const MovieList = ({ listTitle, user, genre, listSummary, movies }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="movie-list-container">
      <div className="list-thumbnail">
        <img
          src={movies[0]?.thumbnail || '../assets/test.jpg'}
          alt={listTitle}
          className="thumbnail-image"
        />
      </div>
      <div className="list-details">
        <p className="list-user">{user}</p>
        <h3 className="list-title">{listTitle}</h3>
        <p className="list-genre">{genre}</p>
        <p className="list-summary">Titles: {listSummary}</p>
      </div>
      <div className="list-actions">
        <button className="favorite-button" onClick={handleFavoriteToggle}>
          <img
            src={HeartIcon}
            alt="Favorite"
            className={`heart-icon ${isFavorited ? 'favorited' : ''}`}
          />
        </button>
        <ListDropdown
          buttonLabel="Add to List"
          options={[
            { label: 'Add to Space Wizards', href: '#a' },
            { label: 'Add to Nostalgia', href: '#b' },
            { label: 'Create New List' },
          ]}
          buttonStyle={{ backgroundColor: '#f1dac4', color: 'black' }}
          menuStyle={{ backgroundColor: '#f1dac4' }}
        />
      </div>
    </div>
  );
};

export default MovieList;






