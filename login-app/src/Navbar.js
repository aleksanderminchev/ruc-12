// Navbar.js
import React from "react";
import { Link } from "react-router-dom";

function Navbar({ isLoggedIn, onLogout }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-secondary-subtle " style={{ height: '80px', padding: '20px' }}>
            
            <div className="container ">
                <Link className="navbar-brand" to="/" style={{ fontSize: '24px' }}>Home</Link>
                <Link className="navbar-brand" to="/" style={{ fontSize: '24px' }}>Movies</Link>
                <Link className="navbar-brand" to="/actors" style={{ fontSize: '24px' }}>Actors</Link>
                    <div className="collapse navbar-collapse justify-content-end">
                        <ul className="navbar-nav">
                            {isLoggedIn ? (
                                <li className="nav-item">
                                    <button className="btn btn-link nav-link" onClick={onLogout} style={{ color: 'black', fontSize: '18px' }}>Logout</button>
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
