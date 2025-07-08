import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/adminSidebar.css";

const AdminSidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <span>🟪</span> <strong>LOGO</strong>
      </div>

      <input type="text" placeholder="🔍 Search" className="sidebar-search" />

      <div className="sidebar-section">
        <h4>Recruitment</h4>
        {/* <NavLink to="/candidates">👥 Candidates</NavLink> */}
        <NavLink
          to="/admin/candidates"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          👥 Candidates
        </NavLink>
      </div>

      <div className="sidebar-section">
        <h4>Organization</h4>
        <NavLink to="/employees">👨‍💼 Employees</NavLink>
        <NavLink to="/attendance">📅 Attendance</NavLink>
        <NavLink to="/leaves">📝 Leaves</NavLink>
      </div>

      {/* <div className="sidebar-section">
        <h4>Others</h4>
        <NavLink to="/logout">🚪 Logout</NavLink>
      </div> */}
    </div>
  );
};

export default AdminSidebar;
