import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMovie, bookMarkMovie } from "../../redux/slices/movie";
import { useSelector, useDispatch } from "../../redux/store";
import { Box, CircularProgress, Button } from "@mui/material";
import MovieListRow from "./MoviesListRow";
function SearchResults() {
  // Replace these with actual data from your database or API
  const dispatch = useDispatch();
  const { movie, searchedMovies, isLoading } = useSelector(
    (state) => state.movie
  );
  const { user } = useSelector((state) => state.user);

  // Function to split the cast into two groups

  return !isLoading && !searchedMovies ? (
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
      <MovieListRow
        movies={searchedMovies}
        isLoading={isLoading}
        title="Results"
      />
    </>
  );
}

export default SearchResults;
