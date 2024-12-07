import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import TopListsCarousel from "../components/TopListsCarousel";
import TitleDisplay from "../components/TitleDisplay";
import Tabs from "../components/Tabs";
import "../styles/Movie.css";
import { getRecommendedContent, getUserLists } from "../../api/mock";
import { useAuth } from "../context/AuthContext";

const Animation = () => {
  const [selectedCategory, setSelectedCategory] = useState("Recommended");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userLists, setUserLists] = useState([]);
  const { user } = useAuth();

  const categories = [
    "Recommended",
    "Comedy",
    "Action",
    "Romantic",
    "Thriller",
    "Sci-Fi",
    "Horror",
    "TV Shows",
  ];

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

  const fetchMovies = async (category) => {
    setLoading(true);
    setError(null);
    console.log("Fetching movies for category:", category);
    try {
      let data;
      if (category === "Recommended") {
        data = await getRecommendedContent(50, "both", null, false, 5, true);
      } else if (categories.includes(category)) {
        data = await getRecommendedContent(
          50,
          "both",
          category,
          false,
          5,
          true
        );
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
        <h1 className="forum-title">Animation</h1>
        <TopListsCarousel title="Browse Top content" type="both" />
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
                movies={movies}
                lists={userLists}
                contentID={movie.contentID}
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

export default Animation;
