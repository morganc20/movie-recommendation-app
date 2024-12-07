import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import TopListsCarousel from "../components/TopListsCarousel";
import TitleDisplay from "../components/TitleDisplay";
import Tabs from "../components/Tabs";
import "../styles/Movie.css";
import { getRecommendedContent } from "../../api/app";

const Television = () => {
  const [selectedCategory, setSelectedCategory] = useState("Recommended");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    "Recommended",
    "Comedy",
    "Action",
    "Romantic",
    "Thriller",
    "Sci-Fi",
    "Horror",
    "Animation",
  ];

  const fetchMovies = async (category) => {
    setLoading(true);
    setError(null);

    try {
      let data;
      if (category === "Recommended") {
        data = await getRecommendedContent(50, "tv_show", null, false, 5);
      } else if (categories.includes(category)) {
        data = await getRecommendedContent(50, "tv_show", category, false, 5);
      } else {
        data = [];
      }

      setMovies(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load movies");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(selectedCategory);
  }, [selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="forum">
      <Header />
      <div className="forum-content">
        <h1 className="forum-title">Television</h1>
        <TopListsCarousel title="Browse Top content" />
        <Tabs
          categories={categories}
          onSelectCategory={handleCategorySelect}
          activeCategory={selectedCategory}
        />

        <div className="movie-lists">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : movies.length > 0 ? (
            movies.map((movie) => (
              <TitleDisplay
                key={movie.title}
                title={movie.title}
                director={movie.director}
                genre={movie.genre}
                cast={`Cast: ${movie.cast || "Not available"}`}
                movieImage={movie.photoUrl}
              />
            ))
          ) : (
            <p>No movies available for this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Television;
