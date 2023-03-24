import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css"
function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };
  return (
    <div className="navbar">
      
      <div className="rightSide">
        <Link to="/" > Home </Link>
        <Link to="/login"> Login </Link>
        <Link to="/profile"> Profile </Link>
        <Link to="/form"> Quote Form </Link>
        <Link to="/history"> History </Link>
        <button onClick={toggleNavbar}>
            Click
        </button>
      </div>
    </div>
  );
}

export default Navbar;