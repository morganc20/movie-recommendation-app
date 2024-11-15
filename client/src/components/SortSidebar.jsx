import React from 'react';
import '../styles/SortSidebar.css';

const SortSidebar = () => {
  return (
    <aside className="sort-sidebar">
      <h3>Sort By</h3>
      <ul>
        <li>Categories</li>
        <li>Rating</li>
        <li>Directors</li>
      </ul>
    </aside>
  );
};

export default SortSidebar;
