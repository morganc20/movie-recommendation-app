import React, { useState, useEffect } from "react";
import {
  getAdminReportsForReview,
  updateReportStatus,
  updateListPrivacy,
} from "../../api/app.js";
import "../Styles/ManageReports.css";

const ManageReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const data = await getAdminReportsForReview();
      setReports(data);
    };
    fetchReports();
  }, []);

  const handleUpdateReportStatus = async (reportId, status, listId = null) => {
    console.log(`Updating report ID: ${reportId}, Status: ${status}`);
    const response = await updateReportStatus(reportId, status);
    console.log(reportId, status, listId);
    if (response) {
      console.log(
        `Report status updated. Report ID: ${reportId}, Status: ${status}`
      );
      if (status === "punished" && listId) {
        console.log(`Preparing to update privacy for list ID: ${listId}`);
        const privacyResponse = await updateListPrivacy(listId, false);
        if (privacyResponse) {
          console.log(`List ID ${listId} privacy updated successfully.`);
        } else {
          console.log(`Failed to update privacy for list ID: ${listId}`);
        }
      }

      // Remove the report from the state after successful update
      setReports((prevReports) =>
        prevReports.filter((report) => report.reportId !== reportId)
      );
    } else {
      console.log(`Failed to update report status for report ID: ${reportId}`);
    }
  };

  return (
    <div className="manage-reports">
      <h1 className="page-title">Manage Reports</h1>
      {reports.length > 0 ? (
        reports.map((report, index) => (
          <div key={index} className="report-card">
            <div className="report-card-content">
              <div className="report-info">
                <h3 className="report-name">{report.listName}</h3>
                <div className="report-details">
                  <p>
                    <span className="label">List Owner:</span>{" "}
                    {report.listOwner}
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
                <button
                  className="keep-btn"
                  onClick={() =>
                    handleUpdateReportStatus(
                      report.reportId,
                      "punished",
                      report.listId
                    )
                  }
                >
                  Approve (Punish)
                </button>
                <button
                  className="delete-btn"
                  onClick={() =>
                    handleUpdateReportStatus(report.reportId, "settled")
                  }
                >
                  Reject (Settle)
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No reports available for review.</p>
      )}
    </div>
  );
};

export default ManageReports;
