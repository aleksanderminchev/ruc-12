import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
export default function Results({ movies, isLoading, title }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
              <div
                style={{ height: "100%", minHeight: "90%" }}
                onClick={() => {
                  console.log("TestF");
                  navigate(`/movie/${movie.identifier}`);
                }}
              >
                <Card sx={{ height: "100%", backgroundColor: "#D9D9D9" }}>
                  <Stack direction={"column"}>
                    <Box
                      component="img"
                      src={movie.poster}
                      sx={{ height: 300 }}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "70%",
                        objectFit: "cover",
                      }}
                      justifyContent={"space-between"}
                    />
                    <Typography>{movie.title}</Typography>
                  </Stack>
                </Card>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}
