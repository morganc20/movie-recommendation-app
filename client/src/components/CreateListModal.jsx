import React, { useState } from "react";
import "../styles/CreateListModal.css";
import { createNewList } from "../../api/app";
import { useAuth } from "../context/AuthContext";

const CreateListModal = ({ isOpen, onClose, onListCreated }) => {
  const { user } = useAuth();
  const [listName, setListName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateList = async () => {
    if (!listName) {
      setError("List name is required");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const payload = {
        userId: user.userId,
        name: listName,
        description,
        createdAt: new Date().toISOString(),
        contentIds: [],
        ratings: [],
        active: true,
      };

      const token = localStorage.getItem("access_token");
      await createNewList(payload, token);

      onListCreated();
      onClose();
      window.location.reload();
    } catch (err) {
      setError("Failed to create the list.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create New List</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label>List Name</label>
          <input
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="Enter list name"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a description (optional)"
          />
        </div>
        <div className="button-group">
          <button
            className="create-button"
            onClick={handleCreateList}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateListModal;
