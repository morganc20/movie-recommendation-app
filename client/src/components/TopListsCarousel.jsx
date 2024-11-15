import React from 'react';
import '../styles/TopListsCarousel.css';
import TopMoviesImage from '../assets/test.jpg';

const TopListsCarousel = () => {
  return (
    <div className="top-lists-carousel">
      <img src={TopMoviesImage} alt="Top Movies" />
      <img src={TopMoviesImage} alt="Top Movies" />
      <img src={TopMoviesImage} alt="Top Movies" />

    </div>
  );
};

export default TopListsCarousel;
