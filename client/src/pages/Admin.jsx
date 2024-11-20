import React from "react";
import Header from "../components/Header";
import { Edit } from "../components/Edit";
import { Plus } from "../components/Plus";
import "../Styles/Admin.css";

const Admin = () => {
  return (
    <div className="admin-dashboard">
      <Header />
      <div className="admin-container">
        <aside className="admin-menu">
          <ul className="menu-options">
            <li>Review Requests</li>
            <li className="active">Add Title</li>
            <li>Review Lists</li>
            <li>Content Preferences</li>
            <li>Account Status</li>
            <li>Approve Feature</li>
            <li>Report</li>
            <li>Help</li>
          </ul>
          <div className="divider"></div>
        </aside>
        <main className="add-title">
          <h1 className="dashboard-title">Administrator Dashboard</h1>
          <form className="movie-form">
            <div className="movie-form-group">
              <label className="label" htmlFor="name">Name</label>
              <div className="input-container">
                <input type="text" id="name" className="form-input" placeholder="Enter name" />
              </div>
            </div>
            <div className="movie-form-group">
              <label className="label" htmlFor="director">Director</label>
              <div className="input-container">
                <input type="text" id="director" className="form-input" placeholder="Enter director" />
              </div>
            </div>
            <div className="movie-form-group">
              <label className="label" htmlFor="categories">Categories</label>
              <div className="input-container">
                <input type="text" id="categories" className="form-input" placeholder="Enter categories" />
              </div>
            </div>
            <div className="movie-form-group">
              <label className="label" htmlFor="trailer">Trailer Link</label>
              <div className="input-container">
                <input type="text" id="trailer" className="form-input" placeholder="Enter trailer link" />
              </div>
            </div>
            <div className="movie-form-group">
              <label className="label" htmlFor="pictures">Upload Pictures</label>
              <div className="input-container">
                <input type="file" id="pictures" className="form-input" />
              </div>
            </div>
            <div className="movie-form-group">
              <label className="label" htmlFor="synopsis">Synopsis</label>
              <textarea id="synopsis" className="synopsis-box" placeholder="Enter synopsis"></textarea>
            </div>
            <button type="submit" className="submit-button">Add Title</button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Admin;
