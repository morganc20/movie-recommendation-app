import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import ListItem from "../components/ReportPanel";
import "../Styles/ModeratorDashboard.css";
import { getReportsForReview, updateReportStatus } from "../../api/app.js";
import { format } from "date-fns";

const ModeratorDashboard = () => {
  const navigate = useNavigate();
  const [reports, setReports] = React.useState([]);

  React.useEffect(() => {
    getReportsForReview().then((data) => {
      setReports(data);
    });
  }, []);

  // Function to handle report approval or deletion
  const handleUpdateReportStatus = async (reportId, approved) => {
    console.log(reportId, approved);
    const response = await updateReportStatus(reportId, approved);
    if (response) {
      // Update the reports in state to reflect the changes
      setReports((prevReports) =>
        prevReports.filter((report) => report.reportId !== reportId)
      );
    }
  };

  return (
    <div className="moderator-container">
      <header className="moderator-header">
        <img src={Logo} alt="What to Watch Logo" className="moderator-logo" />
        <h1 className="moderator-title">Moderator Dashboard</h1>
      </header>

      <section className="manage-reports">
        <h2 className="manage-reports-title">Manage Reports</h2>
        {reports.map((report, index) => (
          <ListItem
            key={index}
            listName={report.listName}
            listOwner={report.listOwner}
            dateReported={format(new Date(report.reportDate), "MMMM dd, yyyy")}
            reason={report.description}
            onDelete={() =>
              handleUpdateReportStatus(report.reportId, "rejected")
            }
            onKeep={() => handleUpdateReportStatus(report.reportId, "pending")}
          />
        ))}
      </section>
    </div>
  );
};

export default ModeratorDashboard;
