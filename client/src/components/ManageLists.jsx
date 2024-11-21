import React, { useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import "../Styles/ManageLists.css";

const ManageLists = () => {
  const [lists] = useState([
    {
      listId: "1",
      listTitle: "Top Sci-Fi Movies",
      listOwner: "johndoe",
      description: "A curated list of the best sci-fi movies ever made.",
      listPrivacy: "Public",
    },
    {
      listId: "2",
      listTitle: "Family Favorites",
      listOwner: "janesmith",
      description: "Our family's go-to movies for movie night.",
      listPrivacy: "Private",
    },
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [editedList, setEditedList] = useState(null);

  const handleEdit = (list) => {
    setSelectedList(list);
    setEditedList({ ...list });
    setIsEditModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedList({ ...editedList, [name]: value });
  };

  const handleSaveChanges = () => {
    console.log("Saved list:", editedList);
    setIsEditModalOpen(false);
  };

  return (
    <div className={`manage-list ${isEditModalOpen ? "blur-background" : ""}`}>
      <h2 className="page-title">Manage Lists</h2>
      <div className="list-grid">
        {lists.map((list, index) => (
          <div key={index} className="list-card">
            <div className="list-card-content">
              <div className="list-info">
                <h3 className="list-title">{list.listTitle}</h3>
                <div className="list-details">
                  <p>
                    <span className="label">Owner:</span> {list.listOwner}
                  </p>
                  <p>
                    <span className="label">Description:</span> {list.description}
                  </p>
                  <p>
                    <span className="label">Privacy:</span> {list.listPrivacy}
                  </p>
                </div>
              </div>
              <div className="list-actions">
                <button
                  className="icon-button edit"
                  onClick={() => handleEdit(list)}
                >
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
              <h3>Edit List</h3>
              <button
                className="close-button"
                onClick={() => setIsEditModalOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="form-group">
                <label htmlFor="listTitle">List Title</label>
                <input
                  type="text"
                  id="listTitle"
                  name="listTitle"
                  value={editedList.listTitle}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="listOwner">Owner</label>
                <input
                  type="text"
                  id="listOwner"
                  name="listOwner"
                  value={editedList.listOwner}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={editedList.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="listPrivacy">Privacy</label>
                <input
                  type="text"
                  id="listPrivacy"
                  name="listPrivacy"
                  value={editedList.listPrivacy}
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

export default ManageLists;
