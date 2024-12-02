import React from "react";
import "../Styles/Tabs.css";
import FilterIcon from "../assets/filter.svg";

const Tabs = ({ categories, onSelectCategory, activeCategory }) => {
  return (
    <div className="tabs-wrapper">
      <div className="tabs">
        {categories.map((category) => (
          <button
            key={category}
            className={`tab ${category === activeCategory ? "active" : ""}`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <button className="filter-button">
        <img src={FilterIcon} alt="Filter Icon" className="filter-icon" />
      </button>
    </div>
  );
};

export default Tabs;
