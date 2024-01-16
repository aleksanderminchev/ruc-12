import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMovie, bookMarkMovie, rate } from "../../redux/slices/movie";
import { useSelector, useDispatch } from "../../redux/store";
import { Box, CircularProgress, Button } from "@mui/material";
import MovieTest from "./MovieTest";
import { useSnackbar } from "../Snackbar";

function ViewMovie() {
  // Replace these with actual data from your database or API
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const { movie, isLoading } = useSelector((state) => state.movie);
  const { user } = useSelector((state) => state.user);
  const rateMovie = async (movie_id, user_id, value) => {
    try {
      const response = await dispatch(rate(movie_id, user_id, value));
      if (response) {
        console.log("Success");
      } else {
        console.log("Failed");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleBookmarkMovie = async (movie_id, user_id) => {
    try {
      const response = await dispatch(bookMarkMovie(movie_id, user_id));
      if (response) {
        console.log("Success");
      } else {
        console.log("Failed");
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (id) {
      dispatch(getMovie(id));
    }
  }, [dispatch, id]);
  // Function to split the cast into two groups
  const { enqueueSnackbar } = useSnackbar();
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
      <MovieTest
        movie={movie}
        boomarkMovie={handleBookmarkMovie}
        user={user}
        rateMovie={rateMovie}
      />
    </>
  );
}

export default ViewMovie;
