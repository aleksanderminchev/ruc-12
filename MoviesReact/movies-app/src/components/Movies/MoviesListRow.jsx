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
export default function MoviesList({ movies }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.movie);

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
      <Grid item xs={1}>
        <Stack direction={"column"}>
          <Box
            className="card-img-top"
            component="img"
            src={
              "https://m.media-amazon.com/images/I/51kagj+xxpL._SL500_._SL200_.jpg"
            }
          />
          <Typography>{"Fast X"}</Typography>
        </Stack>
      </Grid>
      <Grid item xs={1}>
        <Stack direction={"column"}>
          <Box
            className="card-img-top"
            component="img"
            src={
              "https://m.media-amazon.com/images/I/51kagj+xxpL._SL500_._SL200_.jpg"
            }
          />
          <Typography>{"Fast X"}</Typography>
        </Stack>
      </Grid>
      <Grid item xs={1}>
        <Stack direction={"column"}>
          <Box
            className="card-img-top"
            component="img"
            src={
              "https://m.media-amazon.com/images/I/51kagj+xxpL._SL500_._SL200_.jpg"
            }
          />
          <Typography>{"Fast X"}</Typography>
        </Stack>
      </Grid>
      <Grid item xs={1}>
        <Stack direction={"column"}>
          <Box
            className="card-img-top"
            component="img"
            src={
              "https://m.media-amazon.com/images/I/51kagj+xxpL._SL500_._SL200_.jpg"
            }
          />
          <Typography>{"Fast X"}</Typography>
        </Stack>
      </Grid>
      <Grid item xs={1}>
        <Stack direction={"column"}>
          <Box
            className="card-img-top"
            component="img"
            src={
              "https://m.media-amazon.com/images/I/51kagj+xxpL._SL500_._SL200_.jpg"
            }
          />
          <Typography>{"Fast X"}</Typography>
        </Stack>
      </Grid>
       <Grid item xs={1}>
        <Stack direction={"column"}>
          <Box
            className="card-img-top"
            component="img"
            src={
              "https://m.media-amazon.com/images/I/51kagj+xxpL._SL500_._SL200_.jpg"
            }
          />
          <Typography>{"Fast X"}</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}
