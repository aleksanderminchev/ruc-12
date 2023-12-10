import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "../../redux/store";
import { getMoviesNewest } from "../../redux/slices/movie";
import {
  Grid,
  Typography,
  Card,
  Stack,
  Box,
  CircularProgress,
} from "@mui/material";
export default function MoviesList({ movies }) {
  const dispatch = useDispatch();
  const { newestMovies, isLoading } = useSelector((state) => state.movie);
  useEffect(() => {
    dispatch(getMoviesNewest());
  }, []);
  return isLoading ? (
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
    <Grid container spacing={2} direction={"row"}>
      {newestMovies.map((movie, index) => {
        return (
          <Grid key={index} item xs={1.2}>
            <Stack direction={"column"}>
              <Box
                className="card-img-top"
                component="img"
                src={movie.poster}
              />
              <Typography>{movie.primaryTitle}</Typography>
            </Stack>
          </Grid>
        );
      })}
    </Grid>
  );
}
