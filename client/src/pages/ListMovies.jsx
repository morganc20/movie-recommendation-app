import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import "../styles/ListMovies.css";

const ListMovies = () => {
  const { listId } = useParams(); // Extract listId from URL
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const dummyMovies = [
          {
            id: 1,
            title: "Mad Max: Fury Road",
            genre: "Action",
            director: "George Miller",
            cast: "Tom Hardy, Charlize Theron",
            movieImage: "https://via.placeholder.com/150",
          },
        ];
        setMovies(dummyMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [listId]);

  return (
    <div className="forum">
      <Header />
      <div className="forum-content">
        <h1 className="forum-title">Movies in List</h1>
        <div className="main-content">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id} className="movie-row">
                <img src={movie.movieImage} alt={movie.title} className="movie-image" />
                <div className="movie-details">
                  <h2 className="movie-title">{movie.title}</h2>
                  <p><strong>Genre:</strong> {movie.genre}</p>
                  <p><strong>Director:</strong> {movie.director}</p>
                  <p><strong>Cast:</strong> {movie.cast}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-movies-message">No movies found in this list.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListMovies;
