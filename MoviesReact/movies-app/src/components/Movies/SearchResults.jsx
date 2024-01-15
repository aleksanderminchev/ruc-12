import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMovie, bookMarkMovie } from "../../redux/slices/movie";
import { useSelector, useDispatch } from "../../redux/store";
import { Box, CircularProgress, Button, Pagination } from "@mui/material";
import Results from "./Results";
function SearchResults() {
  // Replace these with actual data from your database or API
  const dispatch = useDispatch();
  const { movie, searchedMovies, isLoading } = useSelector(
    (state) => state.movie
  );
  const { user } = useSelector((state) => state.user);
  const [start, setStart] = useState(0);
  console.log(start);
  const [page, setPage] = useState(1);
  // Function to split the cast into two groups
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    if (searchedMovies) {
      const copiedMovies = [...searchedMovies]; // Create a copy of searchedMovies
      setMovies(copiedMovies.splice(start, 30));
    }
  }, [start]);
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
      <Results movies={movies} isLoading={isLoading} title="Results" />
      <Pagination
        onChange={(event, value) => {
          if (page < value) {
            setStart(start + 30);
          } else if (page > value) {
            setStart(start - 30);
          }
          setPage(value);
        }}
        siblingCount={2}
        boundaryCount={6}
        sx={{
          background: "grey",
          color: "grey",
          marginTop: "20px",
          marginBottom: "20px",
          fontSize: "34px", // Adjust the font size as needed
          width: "100%",
        }}
        count={Math.round(searchedMovies.length / 30)}
        color="primary"
        variant="outlined"
        shape="rounded"
      />
    </>
  );
}

export default SearchResults;
