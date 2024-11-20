import React from 'react';
import '../Styles/ReportPanel.css';

const ReportPanel = ({ listName, listOwner, dateReported, reason }) => {
  return (
    <div className="list-item">
      <p><strong>List Name:</strong> {listName}</p>
      <p><strong>List Owner:</strong> {listOwner}</p>
      <p><strong>Date Reported:</strong> {dateReported}</p>
      <p><strong>Reason of Report:</strong> {reason}</p>
      <div className="list-actions">
        <button className="delete-btn">Delete List</button>
        <button className="keep-btn">Keep List</button>
      </div>
    </div>
  );
};

export default ReportPanel;
