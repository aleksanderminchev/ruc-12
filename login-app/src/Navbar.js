// Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import Dropdown from 'react-bootstrap/Dropdown';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate.push('/');
    onLogout();
  };

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
                <Dropdown>
                  <Dropdown.Toggle variant="link" id="dropdown-basic" style={{ color: 'black', fontSize: '18px' }}>
                    <FaUser style={{ marginLeft: '5px' }} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/bookmarks" onClick={() => console.log("Bookmarks")}>
                      Bookmarks
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/reviews" onClick={() => console.log("Reviews")}>
                      Reviews
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/account" onClick={() => console.log("Account")}>
                      Account
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item as={Link} to="/home" onClick={() => console.log("Account")}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
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
};

export default Navbar;
