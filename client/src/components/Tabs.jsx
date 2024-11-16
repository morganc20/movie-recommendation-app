import React, { useState } from 'react';
import '../Styles/Tabs.css';
import FilterIcon from '../assets/filter.svg'; 

const Tabs = ({ categories, onSelectCategory }) => {
  const [activeTab, setActiveTab] = useState(categories[0]);

  const handleTabClick = (category) => {
    setActiveTab(category);
    onSelectCategory(category);
  };

  return (
    <div className="tabs-wrapper">
      <div className="tabs">
        {categories.map((category) => (
          <button
            key={category}
            className={`tab ${category === activeTab ? 'active' : ''}`}
            onClick={() => handleTabClick(category)}
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


