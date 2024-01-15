import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "../../redux/store";
import { logout } from "../../redux/slices/user";

function Header() {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, isLoading } = useSelector((state) => state.user);

  
  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          border: "1px solid #000",
          background: "gray", // Set this to the color of your navbar
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          height: '77px',
          padding: '20px',
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ marginRight: 'auto' }}>
        <Button color="inherit" component={Link} to="/" sx={{ fontSize: "3.1rem", color: "yellow", fontWeight: "bold", fontFamily: 'Poppins', marginRight: '8px' }}>
          Film24
        </Button>
        <Button color="inherit" component={Link} to="/" sx={{ fontSize: "1.6rem", color: 'black', fontFamily:'serif', marginRight: '2px'}}>
          Home
        </Button>
        <Button color="inherit" component={Link} to="/movies" sx={{ fontSize: "1.6rem", color: 'black', fontFamily:'serif', marginRight: '2px'}}>
          Movies
        </Button>
        <Button color="inherit" component={Link} to="/actors" sx={{ fontSize: "1.6rem", color: 'black', fontFamily:'serif'}}>
          Actors
        </Button>
        </div>

        {/* Push the following buttons to the right corner */}
        <div style={{ marginLeft: 'auto' }}>
        <TextField
          onClick={() => {
            setSearchOpen(!searchOpen);
          }}
          label="Search"
          InputProps={{ sx: { backgroundColor: 'white',  width: '280px', height:'54px', marginRight: '10px'} }}
        />
          {!user ? (
            <Button color="inherit" component={Link} to="/login" sx={{color: "black", fontSize: '18px', fontWeight: "bold"}}>
              Login
            </Button>
          ) : (
            <>
              
              <Button color="inherit" component={Link} to="/profile" sx={{ fontSize: "18px", color: "black", fontWeight: "bold"}}>
                Profile
              </Button>
              <Button
                onClick={() => {
                  dispatch(logout());
                }}
                color="inherit" component={Link} to="/" sx={{ fontSize: "18px", color: "black", fontWeight: "bold"}} >
                Logout
              </Button>
            </>
          )}
        </div>

      </Toolbar>
    </AppBar>
  );
}

export default Header;
