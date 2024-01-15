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
   <div>
      <div className="row">
        <h2 style={{ fontSize: '50px', color: '#FFD700', fontWeight: 'bold' }}>Newest Movies</h2>
        <MoviesListRow movies={newestMovies}  style={{ fontSize: '40px', color: '#FFD700', fontWeight: 'bold' }} />
      </div>
      <div className="row">
        <h2 style={{ fontSize: '50px', color: '#FFD700', fontWeight: 'bold' }}>Popular Movies</h2>
        <MoviesListRow movies={currentPopular}  style={{ fontSize: '40px', color: '#FFD700', fontWeight: 'bold' }} />
      </div>
      <div >
        <h2 style={{ fontSize: '50px', color: '#FFD700', fontWeight: 'bold' }}>Top 10</h2>
        <MoviesListRow movies={mostPopularMovies}  style={{ fontSize: '40px', color: '#FFD700', fontWeight: 'bold' }} />
      </div>
    </div>
  );
}

export default Home;
