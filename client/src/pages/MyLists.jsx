import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/MyLists.css";
import { getMyLists, deleteList } from "../../api/app.js";
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
        const lists = await getMyLists(user.userId);
        setMyLists(lists);
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };

    fetchMyLists();
  }, [user]);

  const handleDelete = async (listId) => {
    try {
      await deleteList(listId);
      setMyLists((prevLists) =>
        prevLists.filter((list) => list.listId !== listId)
      );
    } catch (error) {
      console.error("Error deleting list:", error);
    }
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
              <div key={list.listId} className="list-row">
                <img
                  src={list.listPhoto}
                  alt={list.name}
                  className="list-image"
                />
                <div className="list-details">
                  <h2 className="list-title">{list.name}</h2>
                  <p className="list-description">
                    <span className="list-description-label">Description:</span>{" "}
                    {list.description}
                  </p>
                  <button
                    className="list-options-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(list.listId);
                    }}
                  >
                    Delete List
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
