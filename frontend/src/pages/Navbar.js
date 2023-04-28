import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css"
function Navbar() {
 
  return (
    <div className="navbar">
      
      <div className="rightSide">
        <Link to="/profile"> Profile </Link>
        <Link to="/form"> Quote Form </Link>
        <Link to="/history"> History </Link>
        <Link to="/login"> Logout </Link>
      </div>
    </div>
  );
}

export default Navbar;