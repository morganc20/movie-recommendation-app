import React, { useState } from "react";
import "../Styles/TitleDisplay.css";
import HeartIcon from "../assets/heart.svg";
import ListDropdown from "../components/ListDropdown.jsx";
import { useNavigate } from "react-router-dom";

const TitleDisplay = ({
  title,
  director,
  genre,
  cast,
  movieImage,
  movies,
  lists,
  contentID,
}) => {
  const [favorites, setFavorites] = useState({});
  const navigate = useNavigate();

  // Toggle favorite status
  const toggleFavorite = (movieId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [movieId]: !prevFavorites[movieId],
    }));
  };

  const handleImageClick = (contentID) => {
    navigate(`/title/${contentID}`);
  };

  return (
    <div className="movie-list-container">
      <div className="list-thumbnail">
        <img
          src={movieImage || "../assets/test.jpg"}
          alt={title}
          className="thumbnail-image"
          onClick={() => handleImageClick(contentID)}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="list-details">
        <p className="list-director">{director}</p>
        <h3 className="list-title">{title}</h3>
        <p className="list-genre">{genre}</p>
        <p className="list-cast">{cast}</p>
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
          movie={movies.find((movie) => movie.title === title)}
          lists={lists}
          buttonStyle={{ backgroundColor: "#f1dac4", color: "black" }}
          menuStyle={{ backgroundColor: "#f1dac4" }}
        />
      </div>
    </div>
  );
};

export default TitleDisplay;
