import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
            title: "Action Favorites",
            genre: "Action",
            director: "John Doe",
            cast: "Cast A, Cast B",
            movieImage: "https://via.placeholder.com/150",
          },
          {
            id: 2,
            title: "Romantic Hits",
            genre: "Romance",
            director: "Jane Doe",
            cast: "Cast C, Cast D",
            movieImage: "https://via.placeholder.com/150",
          },
          {
            id: 3,
            title: "Comedy Specials",
            genre: "Comedy",
            director: "Mike Comedy",
            cast: "Cast E, Cast F",
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
    navigate(`/list/${listId}`);
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
              <div
                key={list.id}
                className="list-row"
                onClick={() => handleListClick(list.id)}
              >
                <img
                  src={list.movieImage}
                  alt={list.title}
                  className="list-image"
                />
                <div className="list-details">
                  <h2 className="list-title">{list.title}</h2>
                  <p><strong>Genre:</strong> {list.genre}</p>
                  <p><strong>Director:</strong> {list.director}</p>
                  <p><strong>Cast:</strong> {list.cast}</p>
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
