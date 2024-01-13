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
            <Card
              sx={{
                paddingTop: "10px",
                paddingLeft: "10px",
                paddingRight: "10px",
                width: "95%",
                backgroundColor: "#D9D9D9",
              }}
            >
              <Stack direction={"row"} rowGap={2} spacing={2}>
                <Box
                  component="img"
                  src={movie.poster}
                  sx={{ height: 300 }}
                  style={{
                    maxWidth: "100%", // Ensure the image does not exceed the container width
                    maxHeight: "70%", // Set the maximum height to fill 7/10 of the container
                    objectFit: "cover", // Maintain aspect ratio and crop as needed
                  }}
                  justifyContent={"space-between"}
                />
                <Stack direction={"column"} spacing={1}>
                  <Typography variant="h4">{movie.primaryTitle}</Typography>
                  <Typography>
                    Description: {movie.plot.substring(0, 150)}...
                  </Typography>
                </Stack>
              </Stack>

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
