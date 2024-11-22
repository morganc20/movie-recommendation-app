import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import TopListsCarousel from "../components/TopListsCarousel";
import SortSidebar from "../components/SortSidebar";
import MovieList from "../components/MovieList";
import MovieTitle from "../components/MovieTitle";
import Tabs from "../components/Tabs";
import "../styles/Title.css";
import JawsThumbnail from "../assets/test.jpg";
import CaptainPhillipsThumbnail from "../assets/test.jpg";
import AdriftThumbnail from "../assets/test.jpg";
import ThrillerNightThumbnail from "../assets/test.jpg";
import { getRecommendedContent } from "../../api/app";

const Title = () => {
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
        <h1 className="forum-title">Title</h1>
        <SearchBar />
        <div className="text-wrapper-6">Marvel</div>

        <div className="overlap">
          <div className="overlap-group">
            <div className="overlap-2">
              <div className="text-wrapper-7">The Avengers</div>

              <div className="text-wrapper-8">Action Adventure</div>
            </div>

            <div className="play-svgrepo-com-wrapper">
              <img
                className="play-svgrepo-com"
                alt="Play svgrepo com"
                src={playSvgrepoCom1}
              />
            </div>
          </div>

          <p className="director-joss-whedon">
            <span className="span">Director:</span>

            <span className="text-wrapper-9"> Joss Whedon</span>
          </p>

          <p className="release-date-may">
            <span className="span">Release Date:</span>

            <span className="text-wrapper-9"> May 4th 2012</span>
          </p>

          <p className="imdb">
            <span className="span">IMDb: </span>

            <span className="text-wrapper-9">8.1/10</span>
          </p>

          <p className="rating">
            <span className="span">Rating: </span>

            <span className="text-wrapper-9">12A</span>
          </p>

          <div className="div-wrapper">
            <div className="text-wrapper-10">Add to My List</div>
          </div>
        </div>


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
          <div className="movie-lists">
            <MovieTitle
              studio = "Marvel"
              movieTitle="The Avengers"
              genre="Action Adventure"
              castSummary="Robert Downey Jr, Chris Hemsworth, Chris Evans, Scarlett Johannson"
            />
            <MovieTitle
              studio = "Warner Brothers"
              movieTitle="Interstellar"
              genre="Thriller Sci-Fi"
              castSummary="Matthew McConaughey, Michael Caine, Anne Hathaway"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Title;

