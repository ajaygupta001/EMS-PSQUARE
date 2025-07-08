import React from "react";
import "../../styles/navbar.css";
import { useAuth } from "../../context/authContext";

const Navbar = () => {
  const { logout, user } = useAuth();

  return (
    <div className="navbar">
      <input type="text" placeholder="🔍 Search" className="navbar-search" />
      <div className="navbar-right">
        <span className="navbar-icon">{user.name}</span>
        <span className="navbar-icon">🔔</span>
        <span className="navbar-icon">📩</span>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
