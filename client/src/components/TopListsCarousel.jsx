import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "../styles/TopListsCarousel.css";
import { getRecommendedContent } from "../../api/app.js";

const TopListsCarousel = ({ title, type }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecommendedContent(10, `${type}`, null, false, 8.5);
        console.log(data);
        setMovies(data);
        setLoading(false);
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
