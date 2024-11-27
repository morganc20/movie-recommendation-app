import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import TopListsCarousel from "../components/TopListsCarousel";
import TitleDisplay from "../components/TitleDisplay";
import "../styles/MyLists.css";
import { getMyLists } from "../../api/app.js";
import { useAuth } from "../context/AuthContext.jsx";

const MyLists = () => {
  const [myLists, setMyLists] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMyLists = async () => {
      if (!user || !user.userId) {
        console.warn("User not logged in or userId missing");
        return;
      }

      try {
        const fetchedMyLists = await getMyLists(user.userId);
        setMyLists(fetchedMyLists || []);
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };

    fetchMyLists();
  }, [user]);

  return (
    <div className="forum">
      <Header />
      <div className="forum-content">
        <h1 className="forum-title">My Lists</h1>
        <SearchBar placeholder="Search your created and saved lists" />
        <TopListsCarousel title="Browse Your Lists" />
        <div className="main-content">
          {myLists.length > 0 ? (
            <div className="movie-lists">
              {myLists.map((list) => (
                <TitleDisplay
                  key={list.id}
                  title={list.title}
                  genre={list.genre}
                  director={list.director}
                  cast={list.cast}
                  movieImage={list.movieImage}
                />
              ))}
            </div>
          ) : (
            <p>No lists found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyLists;
