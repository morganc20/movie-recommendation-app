import React, { useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar"; 
import "../styles/CreateList.css";

const CreateList = () => {
  const [listTitle, setListTitle] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState("private");

  const handlePrivacyChange = (value) => {
    setPrivacy(value);
  };

  const handleCreateList = () => {
    console.log("List Created:", { listTitle, description, privacy });
    // API stuff here
  };

  return (
    <div className="create-list-page">
      <Header />
      <div className="create-list-container">
        <h1 className="create-list-title">Create A New List</h1>
        <div className="form-section">
          <h2 className="form-section-title">List Details</h2>
          <label className="form-label">List Title</label>
          <input
            type="text"
            className="form-input"
            value={listTitle}
            onChange={(e) => setListTitle(e.target.value)}
            placeholder="Enter list title"
          />
          <label className="form-label">Description</label>
          <textarea
            className="form-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          ></textarea>
          <h2 className="form-section-title">List Privacy</h2>
          <div className="privacy-buttons">
            <button
              className={`privacy-button ${privacy === "private" ? "selected" : ""}`}
              onClick={() => handlePrivacyChange("private")}
            >
              Private
            </button>
            <button
              className={`privacy-button ${privacy === "public" ? "selected" : ""}`}
              onClick={() => handlePrivacyChange("public")}
            >
              Public
            </button>
          </div>
          <button className="create-list-button" onClick={handleCreateList}>
            Create List
          </button>
        </div>
        <div className="search-section">
          <SearchBar placeholder="Search for titles to add to your list!" />
        </div>
      </div>
    </div>
  );
};

export default CreateList;

