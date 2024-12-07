import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import ListDropdown from "../components/ListDropdown";
import MovieTitle from "../components/MovieTitle";
import "../styles/Title.css";
import {
  getTitleDetails,
  getSimilarMoviesByGenre,
  getUserLists,
} from "../../api/mock";
import { useAuth } from "../context/AuthContext";

const Title = () => {
  const { titleId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [userLists, setUserLists] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const details = await getTitleDetails(titleId);
        console.log("Movie details:", details);
        setMovieDetails(details);

        // Fetch similar movies based on genre
        if (details && details.genre) {
          const movies = await getSimilarMoviesByGenre(details.genre, 5);
          console.log("Similar movies:", movies);
          setSimilarMovies(movies);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [titleId]);

  useEffect(() => {
    const fetchUserLists = async () => {
      if (user?.userId) {
        try {
          const lists = await getUserLists(user.userId);
          setUserLists(lists);
        } catch (error) {
          console.error("Error fetching user lists:", error);
        }
      }
    };

    fetchUserLists();
  }, [user]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const {
    title,
    genre,
    director,
    releaseYear,
    avgRating,
    synopsis,
    photoUrl,
    contentID,
  } = movieDetails;

  return (
    <div className="m-title">
      <Header />
      <div className="content-wrapper">
        <div className="details-wrapper">
          <aside className="details-sidebar">
            <h3>{title}</h3>
            <h2>{genre}</h2>
            <ul>
              <li>Director: {director}</li>
              <li>Release Year: {releaseYear}</li>
              <li>IMDB: {avgRating}/10</li>
              <ListDropdown
                buttonLabel="Add to List"
                lists={userLists}
                movie={movieDetails}
                buttonStyle={{ backgroundColor: "#f1dac4", color: "black" }}
                menuStyle={{ backgroundColor: "#f1dac4" }}
              />
            </ul>
          </aside>
          <img src={photoUrl} alt={title} className="thumbnail-image" />
        </div>

        <div>
          <h2>Synopsis</h2>
          <p className="synopsis-text">{synopsis}</p>
        </div>
      </div>

      <div className="main-content">
        <div className="movie-lists">
          <h2>More Movies Like This</h2>
          {similarMovies.map((movie) => (
            <MovieTitle
              key={movie.id}
              movieTitle={movie.title}
              genre={movie.genre}
              director={movie.director}
              movies={[movie]}
              lists={userLists}
              contentID={movie.contentId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Title;
