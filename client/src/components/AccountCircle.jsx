import React from "react";
import icon from "../assets/icon.svg";
import "../Styles/Admin.css";

export const AccountCircle = () => {
  return (
    <div className="account-circle">
      <img className="icon" alt="Icon" src={icon} />
    </div>
  );
};
