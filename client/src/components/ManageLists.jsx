import React, { useState, useEffect } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import "../Styles/ManageLists.css";
import { getAllLists } from "../../api/mock.js";
import { updateList, deleteList } from "../../api/app.js";

const ManageLists = () => {
  const [lists, setLists] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [editedList, setEditedList] = useState(null);

  // Fetch lists from API
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const fetchedLists = await getAllLists();
        setLists(fetchedLists || []);
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };
    fetchLists();
  }, []);

  const handleEdit = (list) => {
    setSelectedList(list);
    setEditedList({ ...list });
    setIsEditModalOpen(true);
  };

  const handleDelete = async (listId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this list?"
    );
    if (!confirmed) return;

    try {
      await deleteList(listId);
      setLists((prevLists) =>
        prevLists.filter((list) => list.listId !== listId)
      );
      console.log(`List with ID ${listId} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting list with ID ${listId}:`, error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedList({ ...editedList, [name]: value });
  };

  const handleSaveChanges = async () => {
    if (!editedList || !selectedList) return;

    try {
      const updatedList = await updateList(
        selectedList.listId,
        selectedList.userId,
        editedList.description,
        editedList.active
      );

      if (updatedList) {
        setLists((prevLists) =>
          prevLists.map((list) =>
            list.listId === selectedList.listId
              ? { ...list, ...editedList }
              : list
          )
        );
        console.log("List updated successfully:", updatedList);
      } else {
        console.error("Failed to update list");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    }

    setIsEditModalOpen(false);
  };

  return (
    <div className={`manage-list ${isEditModalOpen ? "blur-background" : ""}`}>
      <h2 className="page-title">Manage Lists</h2>
      {lists.length === 0 ? (
        <div className="empty-list-message">
          <p>No lists here, please add a new one!</p>
        </div>
      ) : (
        <div className="list-grid">
          {lists.map((list, index) => (
            <div key={index} className="list-card">
              <div className="list-card-content">
                <div className="list-info">
                  <h3 className="list-title">{list.name}</h3>
                  <div className="list-details">
                    <p>
                      <span className="label">Owner:</span> {list.ownerName}
                    </p>
                    <p>
                      <span className="label">Description:</span>{" "}
                      {list.description}
                    </p>
                    <p>
                      <span className="label">Active:</span>
                      <span
                        className={`active-status ${
                          list.active ? "active" : "inactive"
                        }`}
                      >
                        {list.active ? "Yes" : "No"}
                      </span>
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
                  <button
                    className="icon-button delete"
                    onClick={() => handleDelete(list.listId)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
                <label htmlFor="name">List Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editedList.name || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={editedList.description || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="active">Active</label>
                <select
                  id="active"
                  name="active"
                  value={editedList.active ? "true" : "false"}
                  onChange={(e) =>
                    setEditedList({
                      ...editedList,
                      active: e.target.value === "true",
                    })
                  }
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
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
