import React from "react";

const Sidebar = ({ onMenuSelect }) => {
  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">Admin Panel</div>
      <ul>
        <li onClick={() => onMenuSelect("Manage Reports")}>
          <i className="fas fa-file-alt"></i> Manage Reports
        </li>
        <li onClick={() => onMenuSelect("Manage Users")}>
          <i className="fas fa-users"></i> Manage Users
        </li>
        <li onClick={() => onMenuSelect("Manage Lists")}>
          <i className="fas fa-list"></i> Manage Lists
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
