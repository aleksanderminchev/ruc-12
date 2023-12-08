// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";  // Import the user icon from react-icons/fa

function Navbar({ isLoggedIn, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'gray', height: '80px', padding: '20px' }}>
      <div className="container">
        <Link className="navbar-brand" to="/home" style={{ fontSize: '54px', fontWeight: 'bold', color:'white', fontFamily: 'Poppins', marginRight: '45px'}}>Film24</Link>
        <Link className="navbar-brand" to="/home" style={{ fontSize: '26px', color: 'black' }}>Home</Link>
        <Link className="navbar-brand" to="/movies" style={{ fontSize: '26px' }}>Movies</Link>
        <Link className="navbar-brand" to="/actors" style={{ fontSize: '26px' }}>Actors</Link>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            {isLoggedIn ? (
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={onLogout} style={{ color: 'black', fontSize: '18px' }}>
                  Logout
                  <FaUser style={{ marginLeft: '5px' }} /> {/* Add user icon */}
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" style={{ color: 'black', fontSize: '18px' }}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup" style={{ color: 'black', fontSize: '18px' }}>Sign up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
