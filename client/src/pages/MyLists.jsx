import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import Header from "../components/Header";
import "../styles/MyLists.css";
import { getMyLists } from "../../api/app.js";
import { useAuth } from "../context/AuthContext.jsx";

const MyLists = () => {
  const [myLists, setMyLists] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyLists = async () => {
      if (!user || !user.userId) {
        console.warn("User not logged in or userId missing");
        return;
      }

      try {
        const dummyLists = [
          {
            id: 1,
            title: "90's Babies' Nostalgia Trip",
            description:
              "I love rewatching all the shows I used to watch as a kid! Add any shows you think I missed that fit the vibe! :)",
            movieImage: "https://via.placeholder.com/150",
          },
          {
            id: 2,
            title: "Romantic Evenings",
            description:
              "A curated list of my favorite romantic movies to watch on special nights!",
            movieImage: "https://via.placeholder.com/150",
          },
          {
            id: 3,
            title: "Action-Packed Adventures",
            description:
              "For adrenaline junkies and action enthusiasts, this is the ultimate list of thrill rides.",
            movieImage: "https://via.placeholder.com/150",
          },
        ];
        setMyLists(dummyLists);

      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };

    fetchMyLists();
  }, [user]);

  const handleListClick = (listId) => {
    navigate(`/my-lists/${listId}`);
  };

  return (
    <div className="forum">
      <Header />
      <div className="forum-content">
        <h1 className="forum-title">My Lists</h1>
        <h2 className="section-subtitle">Browse Your Lists</h2>
        <div className="main-content">
          {myLists.length > 0 ? (
            myLists.map((list) => (
              <div key={list.id} className="list-row" onClick={() => handleListClick(list.id)}>
                <img
                  src={list.movieImage}
                  alt={list.title}
                  className="list-image"
                />
                <div className="list-details">
                  <h2 className="list-title">{list.title}</h2>
                  <p className="list-description">
                    <span className="list-description-label">Description:</span> {list.description}
                  </p>
                  <button
                    className="list-options-button"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering navigation
                      alert("Options menu coming soon!");
                    }}
                  >
                    List Options ▼
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-lists-message">No lists found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyLists;
