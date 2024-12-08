import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import TopListsCarousel from "../components/TopListsCarousel";
import TitleDisplay from "../components/TitleDisplay";
import "../styles/MyLists.css";
import { getMyLists, getAllUsers } from "../../api/mock.js";
import { useAuth } from "../context/AuthContext.jsx";

const MyLists = () => {
  const [myLists, setMyLists] = useState([]);

  useEffect(() => {
    const fetchMyLists = async () => {
      try {
        const users = await getAllUsers();
        const user = users[0];
        const fetchedMyLists = await getMyLists(user.userId);
        console.log(fetchedMyLists);
        setMyLists(fetchedMyLists || []);
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };

    fetchMyLists();
  }, []);

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
                  movies={list.content}
                  genre={list.genre}
                  director={list.director}
                  cast={list.cast}
                  movieImage={list.movieImage}
                  contentID={list.content[0].contentID}
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
