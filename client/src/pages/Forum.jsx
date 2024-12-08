import React from "react";
import Header from "../components/Header";
import TopListsCarousel from "../components/TopListsCarousel";
import "../styles/Forum.css";

const Forum = () => {
  const categories = [
    { title: "Top Picks for Movie Marathons", type: "movie" },
    { title: "Feel-Good Favorites", type: "movie" },
    { title: "Critically Acclaimed Classics", type: "movie" },
    { title: "Hidden Gems You Need to See", type: "movie" },
    { title: "Epic Sci-Fi Adventures", type: "movie" },
    { title: "Laugh-Out-Loud Comedy Lists", type: "movie" },
    { title: "Heart-Pounding Thrillers", type: "movie" },
    { title: "Animated Magic for All Ages", type: "movie" },
  ];

  return (
    <div className="forum">
      <Header />
      <div className="forum-content">
        <h2 className="forum-title">Explore Curated Lists</h2>
        <div className="main-content">
          {categories.map((category, index) => (
            <TopListsCarousel
              key={index}
              title={category.title}
              type={category.type}
              shuffle={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Forum;
