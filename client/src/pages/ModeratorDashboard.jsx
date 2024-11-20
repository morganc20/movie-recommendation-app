import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import ListItem from '../components/ReportPanel';
import '../Styles/ModeratorDashboard.css';

const ModeratorDashboard = () => {
  const navigate = useNavigate();

  // Example report data
  const reports = [
    {
      listName: 'Misleading titles',
      listOwner: 'pauljames5980',
      dateReported: '24th September, 2024',
      reason: 'Spam list made.',
    },
    {
      listName: 'Offensive content',
      listOwner: 'janedoe123',
      dateReported: '10th October, 2024',
      reason: 'Contains inappropriate material.',
    },
    {
      listName: 'Duplicate list',
      listOwner: 'johnsmith456',
      dateReported: '15th October, 2024',
      reason: 'Same as another list.',
    },
  ];

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
            dateReported={report.dateReported}
            reason={report.reason}
          />
        ))}
      </section>
    </div>
  );
};

export default ModeratorDashboard;
