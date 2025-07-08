import React from "react";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <input type="search" placeholder="Search" />
      <div className="nav-right">
        <span>🔔</span>
        <span>📩</span>
        <div className="profile-icon">👤</div>
      </div>
    </div>
  );
};

export default Navbar;
