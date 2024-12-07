import React, { useState, useEffect } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { updateUserDetails, deleteUser } from "../../api/app.js";
import { getAllUsers } from "../../api/mock.js";
import "../Styles/ManageUsers.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersFromServer = await getAllUsers();
      console.log("Fetched users:", usersFromServer);
      setUsers(usersFromServer || []);
    };
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditedUser({ ...user });
    setIsEditModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleDelete = async (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmed) return;

    try {
      await deleteUser(userId);
      // Remove the deleted user from the state
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.userId !== userId)
      );
      console.log(`User with ID ${userId} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error);
    }
  };

  const handleSaveChanges = async () => {
    if (!editedUser || !selectedUser) return;

    try {
      const updatedData = {
        firstName: editedUser.firstName,
        lastName: editedUser.lastName,
        email: editedUser.email,
        username: editedUser.username,
      };

      const userId = selectedUser.userId; 
      console.log("Updating user with userId:", userId);

      const updatedUser = await updateUserDetails(userId, updatedData);

      if (updatedUser) {
        // Update the state to reflect the changes immediately
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.userId === userId ? { ...user, ...updatedData } : user
          )
        );
        console.log("User updated successfully:", updatedUser);
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    }

    setIsEditModalOpen(false);
  };

  return (
    <div className={`manage-users ${isEditModalOpen ? "blur-background" : ""}`}>
      <h2 className="page-title">Manage Users</h2>
      <div className="user-grid">
        {users.length === 0 ? (
          <p>Loading users...</p>
        ) : (
          Array.isArray(users) &&
          users.map((user) => (
            <div key={user.userId} className="user-card">
              <div className="user-card-content">
                <div className="user-info">
                  <h3 className="user-name">
                    {user.firstName || "N/A"} {user.lastName || "N/A"}
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
                  <button
                    className="icon-button edit"
                    onClick={() => handleEdit(user)}
                  >
                    <FaPencilAlt />
                  </button>
                  <button
                    className="icon-button delete"
                    onClick={() => handleDelete(user.userId)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
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
