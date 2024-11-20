import React, { useState } from "react";
import "../Styles/ManageReports.css";

const ManageReports = () => {
  const [reports] = useState([
    {
      listName: "Misleading titles",
      listOwner: "pauljames5980",
      dateReported: "24th September, 2024",
      reason: "Spam list made.",
    },
    {
      listName: "Offensive content",
      listOwner: "janedoe123",
      dateReported: "10th October, 2024",
      reason: "Contains inappropriate material.",
    },
  ]);

  return (
    <div className="manage-reports">
      <h1 className="page-title">Manage Reports</h1>
        {reports.map((report, index) => (
          <div key={index} className="report-card">
            <div className="report-card-content">
              <div className="report-info">
                <h3 className="report-name">{report.listName}</h3>
                <div className="report-details">
                  <p>
                    <span className="label">List Owner:</span> {report.listOwner}
                  </p>
                  <p>
                    <span className="label">Date Reported:</span>{" "}
                    {report.dateReported}
                  </p>
                  <p>
                    <span className="label">Reason:</span> {report.reason}
                  </p>
                </div>
              </div>
              <div className="report-actions">
                <button className="keep-btn">Approve Report</button>
                <button className="delete-btn">Reject Report</button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ManageReports;
