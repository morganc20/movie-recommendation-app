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
        <div>
            {/* <h1 className="forum-title">Movie Title</h1> */}
            <aside className="details-sidebar">
                <h3>Marvel</h3>
                <h1>The Avengers</h1>
                <h2>Action Adventure</h2>
                <ul>
                    <li>Director: Joss Whedon</li>
                    <li>Release Date: May 4th, 2012</li>
                    <li>IMDB:8.1/10</li>
                    <li>Rating:12A</li>
                    {/* Add more filters as needed */}
                    <button className="add-to-list-button">Add to My List</button>
                </ul>
            </aside> 
            <TopListsCarousel />

            
            <div>
                <h2>Synopsys</h2>
                <p className="synopsis-text">
                Nam eu nibh est. Cras sit amet orci leo. Fusce interdum eleifend
          pretium. Sed porttitor leo ut tristique molestie.
          <br />
          Aenean a magna pharetra, varius elit et, sodales mauris. Pellentesque
          malesuada, nibh commodo mollis aliquam, sapien ipsum
          <br />
          faucibus enim, vitae cursus arcu sapien ut quam. Donec eu ligula mi.
          In vel nisi tempus nulla sagittis interdum et vel nibh.
          <br />
          Curabitur ullamcorper est est, non iaculis erat blandit quis. Donec
          pulvinar egestas nulla vitae malesuada. Integer commodo <br />
          rhoncus dui, non malesuada lectus porttitor a. Vivamus urna leo,
          sollicitudin quis imperdiet non, sollicitudin sit amet ligula. <br />
          Fusce dui lectus, sagittis ut pulvinar et, dapibus sed eros. Donec ut
          velit fermentum, pulvinar magna id, fringilla neque.
          <br />
          Vestibulum vestibulum blandit vestibulum. Mauris vestibulum, dolor non
          eleifend efficitur, massa enim posuere tellus,
          <br />
          quis porttitor tortor quam ac lacus.
          
                </p>
            </div>

        </div>
       
        
        <div className="main-content">
          <div className="movie-lists">
            <h2>More Movies Like This</h2>
            <MovieTitle
              studio = "Marvel"
              movieTitle="The Avengers"
              genre="Action Adventure"
              castSummary="Robert Downey Jr, Chris Hemsworth, Chris Evans, Scarlett Johannson"
              movies={weeklyMovies}
            />
            <MovieTitle
              studio = "Warner Brothers"
              movieTitle="Interstellar"
              genre="Thriller Sci-Fi"
              castSummary="Matthew McConaughey, Michael Caine, Anne Hathaway"
              movies={recommendedMovies}
            /> 
          </div>
        </div>
        
        <div class="list-recommendations">
            <h2>List Featuring This Movie</h2>
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
  );
};

export default Title;

