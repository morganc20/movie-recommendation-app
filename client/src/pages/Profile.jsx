import React, { useState } from "react";
import Header from "../components/Header";
import "../styles/Profile.css"; 
import ProfilePhoto from "../assets/profile.svg";


const Profile = () => {
  const [email, setEmail] = useState("Email@gmail.com");
  const [firstName, setFirstName] = useState("Mockup");
  const [lastName, setLastName] = useState("Mockup");
  const [password, setPassword] = useState("************");
  const [editField, setEditField] = useState("");

  const handleSave = (field) => {
    setEditField("");
    alert(`${field} saved successfully!`);
  };

  return (
    <div className="forum"> 
      <Header />
      <div className="forum-content">
        <h1 className="forum-title">Profile</h1>
        <div className="main-content">
        <div className="profile-avatar">
            <img src={ProfilePhoto} alt="Avatar" className="avatar" />
        </div>

          <div className="profile-fields">
            {/* Email Field */}
            <div className="profile-field">
              <label>Email</label>
              <div className="input-container">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={editField !== "email"}
                />
                <button
                  className="edit-button"
                  onClick={() => setEditField("email")}
                >
                  ✏️
                </button>
                {editField === "email" && (
                  <button
                    className="save-button"
                    onClick={() => handleSave("Email")}
                  >
                    Save
                  </button>
                )}
              </div>
            </div>

            {/* First Name Field */}
            <div className="profile-field">
              <label>First Name</label>
              <div className="input-container">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={editField !== "firstName"}
                />
                <button
                  className="edit-button"
                  onClick={() => setEditField("firstName")}
                >
                  ✏️
                </button>
                {editField === "firstName" && (
                  <button
                    className="save-button"
                    onClick={() => handleSave("First Name")}
                  >
                    Save
                  </button>
                )}
              </div>
            </div>

            {/* Last Name Field */}
            <div className="profile-field">
              <label>Last Name</label>
              <div className="input-container">
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={editField !== "lastName"}
                />
                <button
                  className="edit-button"
                  onClick={() => setEditField("lastName")}
                >
                  ✏️
                </button>
                {editField === "lastName" && (
                  <button
                    className="save-button"
                    onClick={() => handleSave("Last Name")}
                  >
                    Save
                  </button>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="profile-field">
              <label>Password</label>
              <div className="input-container">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={editField !== "password"}
                />
                <button
                  className="edit-button"
                  onClick={() => setEditField("password")}
                >
                  ✏️
                </button>
                {editField === "password" && (
                  <button
                    className="save-button"
                    onClick={() => handleSave("Password")}
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <button className="logout-button">Log out</button>
      </div>
    </div>
  );
};

export default Profile;



