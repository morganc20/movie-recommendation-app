import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import TopListsCarousel from "../components/TopListsCarousel";
import ListDropdown from "../components/ListDropdown"
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
import AvengersThumbnail from '../assets/AvengersThumbnail.png';

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
    <div className="m-title">
      <Header />
      <div className="content-wrapper">
        <div className="details-wrapper">
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
                    <ListDropdown
                        buttonLabel="Add to List"
                        options={[
                            { label: 'Add to Space Wizards', href: '#a' },
                            { label: 'Add to Nostalgia', href: '#b' },
                            {label: 'Create New List'}
                        ]}
                        buttonStyle={{ backgroundColor: '#f1dac4', color: 'black' }}
                        menuStyle={{ backgroundColor: '#f1dac4' }}
                    />
                </ul>
            </aside> 

            <img src={AvengersThumbnail} alt={AvengersThumbnail} className="thumbnail-image" />

            </div>

            
            <div>
                <h2>Synopsys</h2>
                <p className="synopsis-text">
                When Thor's evil brother, Loki (Tom Hiddleston), gains access to the unlimited power of the energy cube called the Tesseract, Nick Fury (Samuel L. Jackson), director of S.H.I.E.L.D., initiates a superhero recruitment effort to defeat the unprecedented threat to Earth. Joining Fury's "dream team" are Iron Man (Robert Downey Jr.), Captain America (Chris Evans), the Hulk (Mark Ruffalo), Thor (Chris Hemsworth), the Black Widow (Scarlett Johansson) and Hawkeye (Jeremy Renner).
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
              cast-summary="Robert Downey Jr, Chris Hemsworth, Chris Evans, Scarlett Johannson"
              movies={recommendedMovies}
            />
            <MovieTitle
              studio = "Warner Brothers"
              movieTitle="Interstellar"
              genre="Thriller Sci-Fi"
              cast-summary="Matthew McConaughey, Michael Caine, Anne Hathaway"
              movies={weeklyMovies}
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
  );
};

export default Title;

