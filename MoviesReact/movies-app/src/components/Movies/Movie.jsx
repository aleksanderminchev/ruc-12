import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMovie } from "../../redux/slices/movie";
import { useSelector, useDispatch } from "../../redux/store";
import { Box, CircularProgress, Button } from "@mui/material";
import MovieTest from "./MovieTest";
function ViewMovie() {
  // Replace these with actual data from your database or API
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const { movie, isLoading } = useSelector((state) => state.movie);
  console.log(isLoading);
  console.log(!movie);
  console.log(movie);
  useEffect(() => {
    if (id) {
      dispatch(getMovie(id));
    }
  }, [dispatch, id]);
  // Function to split the cast into two groups

  return !isLoading && !movie ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <>
      <MovieTest movie={movie} />
    </>
  );
}

export default ViewMovie;
