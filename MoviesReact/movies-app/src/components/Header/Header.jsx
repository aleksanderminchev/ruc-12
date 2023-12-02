import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
function Header() {
  const [searchText, setSearchText] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
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
        <Button color="inherit" component={Link} to="/actor">
          Actors
        </Button>
        <TextField
          onClick={() => {
            setSearchOpen(!searchOpen);
          }}
          label="Search"
        ></TextField>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
