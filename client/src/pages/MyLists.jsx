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

  try {
    data = await getRecommendedContent(50, "movie", category, false, 5);
    setMyLists(data);
    setLoading(false);
  } catch (err) {
    setError("Failed to load movies");
    setLoading(false);
  }
};

useEffect(() => {
  const fetchUserLists = async () => {
    if (user?.userId) {
      try {
        const lists = await getUserLists(user.userId);
        setUserLists(lists);
      } catch (error) {
        console.error("Error fetching user lists:", error);
      }
    }
  };

  fetchUserLists();
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
