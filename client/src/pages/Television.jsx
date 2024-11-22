import React, { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import TopListsCarousel from '../components/TopListsCarousel';
import SortSidebar from '../components/SortSidebar';
import TitleDisplay from '../components/TitleDisplay';
import Tabs from '../components/Tabs';
import '../styles/Television.css';

import JawsThumbnail from '../assets/test.jpg';
import CaptainPhillipsThumbnail from '../assets/test.jpg';
import AdriftThumbnail from '../assets/test.jpg';
import ThrillerNightThumbnail from '../assets/test.jpg';

const Television = () => {
  const [selectedCategory, setSelectedCategory] = useState("Recommended");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const categories = ["Recommended", "Weekly 100", "Comedy", "Action", "Romantic", "Thriller", "More"];

  const recommendedMovies = [
    {
      id: 1,
      title: "Jaws",
      genre: "Thriller",
      director: "Quentin Tarantino",
      cast: "abc, def, xyz",
      movieImage: JawsThumbnail,
    },
    {
      id: 2,
      title: "Captain Phillips",
      genre: "Thriller",
      director: "Quentin Tarantino",
      cast: "abc, def, xyz",
      movieImage: CaptainPhillipsThumbnail,
    },
    {
        id: 3,
        title: "Adrift",
        genre: "Drama",
        director: "Quentin Tarantino",
        cast: "abc, def, xyz",
        movieImage: AdriftThumbnail,
    },
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
        <h1 className="forum-title">Television</h1>
        <SearchBar />
          <TopListsCarousel title="Top Television Titles"/>
        <Tabs categories={categories} onSelectCategory={handleCategorySelect} />
        <div className="main-content">
          <SortSidebar />
          <div className="movie-lists">
            <TitleDisplay
              title="Jaws"
              director="Steven Spielberg"
              genre="Action Adventure"
              cast="Richard Dreyfuss, Robert Shaw,..."
              movieImage={recommendedMovies.find((movie) => movie.title === "Jaws")?.movieImage}  // Quick Work: You can call your API endpoint here to retrieve an image and it should be handled
            />
            <TitleDisplay
              title="Jaws"
              director="Steven Spielberg"
              genre="Action Adventure"
              cast="Richard Dreyfuss, Robert Shaw,..."
              movieImage={recommendedMovies.find((movie) => movie.title === "Jaws")?.movieImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Television;