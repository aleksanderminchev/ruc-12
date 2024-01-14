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
      const response = await dispatch(search(searchText));
      if (response) {
        navigate("/");
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
          background: "#D9D9D9",
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/movies">
          Movies
        </Button>
        <Button color="inherit" component={Link} to="/actors">
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
