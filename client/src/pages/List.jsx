import "../Styles/List.css";


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
import ListContent from "../components/ListContent";

const List = () => {
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
        
       
        
        <div className="main-content">
          
        </div> 
      <div className="list-container">
      <div className="details-wrapper">
            <aside className="details-sidebar">
                <h2>user34345</h2>
                <h1>90's Babies' Nostalgia Trip</h1>
                <h3>Description:</h3>
                <p className="description">
          I love rewatching all the shows I used to watch as a kid! Add any shows
          you think I missed that fit the vibe! :)
                </p>
                <ListDropdown
                        buttonLabel="List Options"
                        options={[
                            { label: 'Add to Liked Lists', href: '#a' },
                            { label: 'Rate List', href: '#b' },
                            {label: 'Report List'}
                        ]}
                        buttonStyle={{ backgroundColor: '#f1dac4', color: 'black' }}
                        menuStyle={{ backgroundColor: '#f1dac4' }}
                />

                <button className="report-button">Report List</button>
                
            </aside> 
            <TopListsCarousel />

            </div>

        </div>
        <h3>90's Babies' Nostalgia Trip</h3>
        <div className="movie-lists">
            <h2>List Titles</h2>
            <ListContent
              listIndex="1"
              studio = "Marvel"
              movieTitle="The Avengers"
              genre="Action Adventure"
              movieCast="Robert Downey Jr, Chris Hemsworth, Chris Evans, Scarlett Johannson"
              movies={recommendedMovies}
            />
            <ListContent
              listIndex="2"
              studio = "Warner Brothers"
              movieTitle="Interstellar"
              genre="Thriller Sci-Fi"
              movieCast="Matthew McConaughey, Michael Caine, Anne Hathaway"
              movies={weeklyMovies}
            /> 
            <ListContent
              listIndex="3"
              studio = "Warner Brothers"
              movieTitle="Interstellar"
              genre="Thriller Sci-Fi"
              movieCast="Matthew McConaughey, Michael Caine, Anne Hathaway"
              movies={weeklyMovies}
            />
            
          </div>
          </div>
    
      
    </div>
  );
};


export default List;
