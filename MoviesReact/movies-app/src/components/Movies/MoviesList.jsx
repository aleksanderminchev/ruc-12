import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "../../redux/store";
import { getMovies } from "../../redux/slices/movie";
import {
  Grid,
  Typography,
  Card,
  Stack,
  Box,
  CircularProgress,
} from "@mui/material";
export default function MoviesList() {
  const dispatch = useDispatch();
  const { movies, isLoading } = useSelector((state) => state.movie);
  useEffect(() => {
    dispatch(getMovies(1));
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
    <Grid container spacing={2}>
      {movies.map((movie, index) => {
        return (
          <Grid key={index} item xs={3}>
            <Card sx={{ width: "100%" }}>
              <Stack direction={"row"} rowGap={2} spacing={2}>
                <Box
                  component="img"
                  src={movie.poster}
                  sx={{ height: 100, mt: "10px", ml: "10px" }}
                  justifyContent={"space-between"}
                />
                <Typography variant="h4">{movie.primaryTitle}</Typography>
              </Stack>

              <Typography>{movie.plot.substring(0, 30)}...</Typography>
              <Stack
                direction={"row"}
                rowGap={2}
                spacing={2}
                alignContent={"space-evenly"}
                justifyContent={"space-between"}
              >
                <Typography>Average rating</Typography>
                <Typography>{movie.averageRating}/10</Typography>
              </Stack>

              <Stack
                direction={"row"}
                rowGap={2}
                spacing={2}
                justifyContent={"space-between"}
              >
                <Typography>Number of votes</Typography>
                <Typography>{movie.numberOfVotes}</Typography>
              </Stack>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
