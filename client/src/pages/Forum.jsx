import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import TopListsCarousel from "../components/TopListsCarousel";
import SortSidebar from "../components/SortSidebar";
import MovieList from "../components/MovieList";
import Tabs from "../components/Tabs";
import "../styles/Forum.css";

import JawsThumbnail from "../assets/test.jpg";
import CaptainPhillipsThumbnail from "../assets/test.jpg";
import AdriftThumbnail from "../assets/test.jpg";
import ThrillerNightThumbnail from "../assets/test.jpg";
import { getRecommendedContent } from "../../api/mock";

const Forum = () => {
  const [selectedCategory, setSelectedCategory] = useState("Recommended");
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      const movies = await getRecommendedContent(100);
      const formattedMovies = movies.map((movie) => ({
        id: movie.contentId,
        title: movie.title,
        genre: movie.genre,
        thumbnail: "", // Placeholder for thumbnail
      }));
      setRecommendedMovies(formattedMovies);
    };

    fetchRecommendedMovies();
  }, []); // Fetch once when the component mounts

  // const recommendedMovies = [
  //   {
  //     id: 1,
  //     title: "Jaws",
  //     genre: "Thriller",
  //     thumbnail: JawsThumbnail,
  //   },
  //   {
  //     id: 2,
  //     title: "Captain Phillips",
  //     genre: "Adventure",
  //     thumbnail: CaptainPhillipsThumbnail,
  //   },
  //   {
  //     id: 3,
  //     title: "Adrift",
  //     genre: "Drama",
  //     thumbnail: AdriftThumbnail,
  //   },
  // ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  console.log(recommendedMovies);
  const categories = [
    "Recommended",
    "Weekly 100",
    "Comedy",
    "Action",
    "Romantic",
    "Thriller",
    "More",
  ];

  const weeklyMovies = [
    {
      id: 4,
      title: "Thriller Night",
      genre: "Thriller",
      thumbnail: ThrillerNightThumbnail,
    },
  ];

  return (
    <div className="forum">
      <Header />
      <div className="forum-content">
        <h1 className="forum-title">Forum</h1>
        <SearchBar />
        <TopListsCarousel />
        <Tabs categories={categories} onSelectCategory={handleCategorySelect} />
        <div className="main-content">
          <SortSidebar />
          <div className="movie-lists">
            <MovieList
              listTitle="Best Boat Movies"
              user="user39450"
              genre="Action Adventure"
              listSummary="Jaws, Captain Phillips, Adrift..."
              movies={recommendedMovies}
            />
            <MovieList
              listTitle="Weekly Highlights"
              user="user85732"
              genre="Thriller"
              listSummary="Thriller Night..."
              movies={weeklyMovies}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
