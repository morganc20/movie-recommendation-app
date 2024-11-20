import React, { useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import "../Styles/ManageUsers.css";

const ManageUsers = () => {
  const [users] = useState([
    {
      username: "johndoe",
      email: "john@example.com",
      firstName: "John",
      lastName: "Doe",
      role: "user",
    },
    {
      username: "janesmith",
      email: "jane@example.com",
      firstName: "Jane",
      lastName: "Smith",
      role: "admin",
    },
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditedUser({ ...user });
    setIsEditModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSaveChanges = () => {
    console.log("Saved user:", editedUser);
    setIsEditModalOpen(false);
  };

  return (
    <div className={`manage-users ${isEditModalOpen ? "blur-background" : ""}`}>
      <h2 className="page-title">Manage Users</h2>
      <div className="user-grid">
        {users.map((user, index) => (
          <div key={index} className="user-card">
            <div className="user-card-content">
              <div className="user-info">
                <h3 className="user-name">
                  {user.firstName} {user.lastName}
                </h3>
                <div className="user-details">
                  <p>
                    <span className="label">Username:</span> {user.username}
                  </p>
                  <p>
                    <span className="label">Email:</span> {user.email}
                  </p>
                  <p>
                    <span className="label">Role:</span> {user.role}
                  </p>
                </div>
              </div>
              <div className="user-actions">
                <button className="icon-button edit" onClick={() => handleEdit(user)}>
                  <FaPencilAlt />
                </button>
                <button className="icon-button delete">
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Edit User</h3>
              <button
                className="close-button"
                onClick={() => setIsEditModalOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={editedUser.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={editedUser.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={editedUser.username}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="button secondary"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
              <button className="button primary" onClick={handleSaveChanges}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
