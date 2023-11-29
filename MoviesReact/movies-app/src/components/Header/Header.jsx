import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function Header() {
  const [searchText, setSearchText] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" href="/">
          Home
        </Button>
        <Button color="inherit" href="/movies">
          Movies
        </Button>
        <Button color="inherit" href="/actor">
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
