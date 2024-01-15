import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "../../redux/store";
import { search } from "../../redux/slices/movie";

import { logout, getSearches } from "../../redux/slices/user";
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, userSearches, isLoading } = useSelector((state) => state.user);
  const [searchText, setSearchText] = useState("");
  console.log(userSearches);
  useEffect(() => {
    if (user) {
      dispatch(getSearches(user.userId));
    }
  }, [user, dispatch]);
  const handleSearch = async (text) => {
    try {
      const response = await dispatch(search(searchText, user.userId));
      if (response) {
        navigate("/searchResults");
      } else {
      }
    } catch (e) {
      console.log(e);
    }
  };
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

        <Autocomplete
          sx={{ width: "20%" }}
          freeSolo
          inputValue={searchText}
          onInputChange={(event, newInputValue) => {
            setSearchText(newInputValue);
          }}
          options={userSearches ? userSearches : ["vwrv", "bwrbwrb", "brbrbw"]}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  // Handle the Enter key press event here
                  handleSearch(event.target.value);
                  console.log();
                }
              }}
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
        {!user ? (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        ) : (
          <>
            <Button
              onClick={() => {
                dispatch(logout());
              }}
              color="inherit"
              component={Link}
              to="/"
            >
              Logout
            </Button>
            <Button color="inherit" component={Link} to="/profile">
              Profile
            </Button>
            <Button color="inherit" component={Link} to="/bookmarks">
              Bookmarks
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
