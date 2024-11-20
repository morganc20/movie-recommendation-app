import React, { useState } from "react";
import "../Styles/Admin.css";
import Sidebar from "../components/Sidebar";
import ManageReports from "../components/ManageReports";
import ManageUsers from "../components/ManageUsers";
import ManageLists from "../components/ManageLists";

const Admin = () => {
  const [selectedMenu, setSelectedMenu] = useState("Manage Reports");

  // Renders content based on the selected menu
  const renderContent = () => {
    switch (selectedMenu) {
      case "Manage Reports":
        return <ManageReports />;
      case "Manage Users":
        return <ManageUsers />;
      case "Manage Lists":
        return <ManageLists />;
      default:
        return <div className="content">Please select a menu item.</div>;
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar onMenuSelect={setSelectedMenu} />
      <div className="admin-main">{renderContent()}</div>
    </div>
  );
};

export default Admin;
