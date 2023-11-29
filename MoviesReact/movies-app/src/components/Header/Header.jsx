import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from 'react-router-dom';
function Header() {
  const [searchText, setSearchText] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/movies" >
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
