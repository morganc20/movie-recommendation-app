import React from "react";
import "../Styles/ReportPanel.css";

const ReportPanel = ({
  listName,
  listOwner,
  dateReported,
  reason,
  onDelete,
  onKeep,
}) => {
  return (
    <div className="list-item">
      <p>
        <strong>List Name:</strong> {listName}
      </p>
      <p>
        <strong>List Owner:</strong> {listOwner}
      </p>
      <p>
        <strong>Date Reported:</strong> {dateReported}
      </p>
      <p>
        <strong>Reason of Report:</strong> {reason}
      </p>
      <div className="list-actions">
        <button className="delete-btn" onClick={onDelete}>
          Close Report (Nothing was wrong)
        </button>
        <button className="keep-btn" onClick={onKeep}>
          Pass to Admin
        </button>
      </div>
    </div>
  );
};

export default ReportPanel;
