import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css"
function Navbar() {
 
  return (
    <div className="navbar">
      
      <div className="rightSide">
        <Link to="/login"> Login </Link>
        <Link to="/profile"> Profile </Link>
        <Link to="/form"> Quote Form </Link>
        <Link to="/history"> History </Link>
      </div>
    </div>
  );
}

export default Navbar;