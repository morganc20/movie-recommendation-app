import React, { useState } from "react";
import "../styles/ListDropdown.css";
import { addContentToList } from "../../api/app.js";

const ListDropdown = ({
  buttonLabel,
  movie,
  lists,
  buttonStyle,
  menuStyle,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleAddToList = async (listId) => {
    try {
      await addContentToList(listId, movie.contentId);
      alert(
        `Added "${movie.title}" to list "${
          lists.find((l) => l.listId === listId).name
        }"`
      );
    } catch (error) {
      console.error("Error adding movie to list:", error);
      alert("Failed to add movie to list.");
    }
  };

  return (
    <div className="dropdown">
      <button
        className="dropdown-button"
        onClick={toggleDropdown}
        style={buttonStyle}
      >
        {buttonLabel} ▼
      </button>
      {isOpen && (
        <div className="dropdown-content" style={menuStyle}>
          {lists.map(({ listId, name }) => (
            <a
              key={listId}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleAddToList(listId);
              }}
            >
              {name}
            </a>
          ))}
          <a href="#create-new-list">Create New List</a>
        </div>
      )}
    </div>
  );
};

export default ListDropdown;
