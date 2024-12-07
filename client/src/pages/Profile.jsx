import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../styles/Profile.css";
import ProfilePhoto from "../assets/profile.svg";
import { useAuth } from "../context/AuthContext";
import { getUserDetails } from "../../api/mock.js";
import { updateProfile } from "../../api/app.js";

const Profile = () => {
  const { user, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("************");
  const [editField, setEditField] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!user) return;
      const userDetails = await getUserDetails(user.userId);
      if (userDetails) {
        setEmail(userDetails.email);
        setFirstName(userDetails.firstName);
        setLastName(userDetails.lastName);
      }
      setLoading(false);
    };
    fetchUserDetails();
  }, [user]);

  const handleSave = async (field) => {
    try {
      const updatedData = {};

      if (field === "password") {
        updatedData.password = password;
      } else {
        updatedData.email = email;
        updatedData.firstName = firstName;
        updatedData.lastName = lastName;
      }

      await updateProfile(user.userId, updatedData);
      setEditField("");
      alert(`${field} saved successfully!`);
    } catch (error) {
      alert(`Failed to save ${field}. Please try again.`);
    }
  };

  if (loading) return <div>Loading...</div>;
  const handleLogout = () => {
    logout();
    window.location.href = "/login"; // Redirect to the login page
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

            <div className="profile-field">
              <label>Password</label>
              <div className="input-container">
                <input
                  type="password"
                  value={editField === "password" ? "" : password}
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
        <button className="logout-button" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default Profile;
