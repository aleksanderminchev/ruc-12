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
export default function MoviesListRow({ movies, isLoading, title }) {
  const dispatch = useDispatch();
  // const { newestMovies, isLoading } = useSelector((state) => state.movie);
  // useEffect(() => {
  //   dispatch(getMoviesNewest());
  // }, []);
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
    <Stack sx={{ mb: "50px" }} direction="column">
      <Typography variant="h3">{title}</Typography>
      <Grid container spacing={2} direction={"row"}>
        {movies.map((movie, index) => {
          return (
            <Grid key={index} item xs={1.2}>
              <Card sx={{ height: "100%", backgroundColor: "#D9D9D9" }}>
                <Stack direction={"column"}>
                  <Box
                    sx={{ height: 200 }}
                    style={{
                      maxWidth: "100%", // Ensure the image does not exceed the container width
                      maxHeight: "70%", // Set the maximum height to fill 7/10 of the container
                      objectFit: "cover", // Maintain aspect ratio and crop as needed
                    }}
                    className="card-img-top"
                    component="img"
                    src={movie.poster}
                  />
                  <Typography>
                    {movie.primaryTitle === ""
                      ? movie.originalTitle
                      : movie.primaryTitle}
                  </Typography>
                </Stack>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}
