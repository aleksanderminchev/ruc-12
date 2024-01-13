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
      <MoviesListRow movies={currentPopular} title="Popular Movies" />

      <MoviesListRow movies={mostPopularMovies} title="Top 10" />
    </>
  );
}

export default Home;
