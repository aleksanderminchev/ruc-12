import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "../redux/store";
import {
  getMoviesNewest,
  getCurrentPopular,
  getTopPopular,
} from "../redux/slices/movie";
import MoviesListRow from "../components/Movies/MoviesListRow";
import { Card, Typography } from "@mui/material";
function Home() {
  const dispatch = useDispatch();
  const { newestMovies, currentPopular, mostPopularMovies } = useSelector(
    (state) => state.movie
  );
  console.log(mostPopularMovies);
  useEffect(() => {
    dispatch(getMoviesNewest());
    dispatch(getCurrentPopular());
    dispatch(getTopPopular());
  }, []);
  return (
    <>
      <MoviesListRow movies={newestMovies} title="Newest Movies" />
      <Card sx={{ height: "100%", mb: "50px", backgroundColor: "#D9D9D9" }}>
        <Typography variant="h3">Popular Movies</Typography>

        <MoviesListRow movies={currentPopular} />
      </Card>
      <Card sx={{ height: "100%", mb: "50px", backgroundColor: "#D9D9D9" }}>
        <Typography variant="h3">Top 10</Typography>

        <MoviesListRow movies={mostPopularMovies} />
      </Card>
    </>
  );
}

export default Home;
