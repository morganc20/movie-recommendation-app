import React, { useState } from "react";
import "../Styles/TitleDisplay.css";
import HeartIcon from "../assets/heart.svg";
import ListDropdown from "../components/ListDropdown.jsx";

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
        <img
          src={movieImage || "../assets/test.jpg"}
          alt={title}
          className="thumbnail-image"
        />
      </div>
      <div className="list-details">
        <p className="list-director">{director}</p>
        <h3 className="list-title">{title}</h3>
        <p className="list-genre">{genre}</p>
      </div>
      <div className="list-actions">
        <button
          className="favorite-button"
          onClick={() => toggleFavorite(title)}
        >
          <img
            src={HeartIcon}
            alt="Favorite"
            className={`heart-icon ${favorites[title] ? "favorited" : ""}`}
          />
        </button>
        <ListDropdown
          buttonLabel="Add to List"
          options={[
            { label: "Add to Space Wizards", href: "#a" },
            { label: "Add to Nostalgia", href: "#b" },
            { label: "Create New List" },
          ]}
          buttonStyle={{ backgroundColor: "#f1dac4", color: "black" }}
          menuStyle={{ backgroundColor: "#f1dac4" }}
        />
      </div>
    </div>
  );
};

export default TitleDisplay;
