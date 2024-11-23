import React from "react";
import Slider from "react-slick";
import "../styles/TopListsCarousel.css";
import JawsThumbnail from "../assets/test.jpg"; // Replace with your actual images

import AvengersThumbnail from "../assets/AvengersThumbnail.png";
import LOTRThumbnail from "../assets/test.jpg";

//run these
//npm install react-slick slick-carousel
//npm install --save-dev css-loader style-loader
//

const TopListsCarousel = ({ title }) => {
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

  const movies = [
    { id: 1, title: "Jaws", thumbnail: JawsThumbnail },
    { id: 2, title: "Avengers", thumbnail: AvengersThumbnail },
    { id: 3, title: "Lord of the Rings", thumbnail: LOTRThumbnail },
    { id: 4, title: "Dead Calm", thumbnail: JawsThumbnail },
    { id: 5, title: "Adrift", thumbnail: JawsThumbnail },
  ];

  return (
    <div className="carousel-container">
      {title && <h2 className="section-title">{title}</h2>}
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className="carousel-slide">
            <img src={movie.thumbnail} alt={movie.title} className="carousel-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TopListsCarousel;

