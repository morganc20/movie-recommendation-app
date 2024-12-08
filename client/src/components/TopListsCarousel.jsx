import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "../styles/TopListsCarousel.css";
import { getRecommendedContent } from "../../api/app.js";

const TopListsCarousel = ({ title, type, shuffle = null }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecommendedContent(
          10,
          `${type}`,
          null,
          false,
          8.5
        );
        if (shuffle) {
          data.sort(() => Math.random() - 0.5);
        }
        console.log("Data:", data);
        if (type === "both") {
          const data = await getRecommendedContent(
            50,
            "both",
            null,
            false,
            5,
            true
          );
          setMovies(data);
          setLoading(false);
        } else {
          setMovies(data);
          setLoading(false);
        }
      } catch (err) {
        setError("Failed to load data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleImageClick = (contentID) => {
    navigate(`/title/${contentID}`);
  };

  if (loading) {
    return <div className="carousel-container">Loading...</div>;
  }

  if (error) {
    return <div className="carousel-container">{error}</div>;
  }

  return (
    <div className="carousel-container">
      {title && <h2 className="section-title">{title}</h2>}
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.title} className="carousel-slide">
            <img
              src={movie.photoUrl}
              alt={movie.title}
              className="carousel-image"
              onClick={() => handleImageClick(movie.contentID)}
              style={{ cursor: "pointer" }}
            />
            <div className="carousel-info">
              <h3>{movie.title}</h3>
              <p>{movie.genre}</p>
              <p>{movie.releaseYear}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TopListsCarousel;
