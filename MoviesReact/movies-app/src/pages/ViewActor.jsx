import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { bookMarkActor, getActor, getActorMovies } from "../redux/slices/actor";
import { useSelector, useDispatch } from "../redux/store";
import { Box, CircularProgress, Button } from "@mui/material";
import Actor from "../components/Actors/Actor";
import { useSnackbar } from "../components/Snackbar";

function ViewActor() {
  // Replace these with actual data from your database or API
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const { actor, actorMovies, isLoading } = useSelector((state) => state.actor);
  const { user } = useSelector((state) => state.user);

  const { enqueueSnackbar } = useSnackbar();

  const handleBookmarkActor = async (movie_id, user_id) => {
    try {
      const response = await dispatch(bookMarkActor(movie_id, user_id));
      if (response) {
        console.log("Success");
        enqueueSnackbar("Bookmarked actor. View in bookmarks", {
          variant: "success",
        });
      } else {
        console.log("Failed");
        enqueueSnackbar("Error bookmarking actor", { variant: "error" });
      }
    } catch (e) {
      console.log(e);
      enqueueSnackbar("Error bookmarking actor", { variant: "error" });
    }
  };
  useEffect(() => {
    if (id) {
      dispatch(getActor(id));
      dispatch(getActorMovies(id));
    }
  }, [dispatch, id]);
  // Function to split the cast into two groups
  console.log(actor);
  return isLoading && !actor ? (
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
      <Actor
        user={user}
        actor={actor}
        actorMovies={actorMovies}
        isLoading={isLoading}
        bookmarkActor={handleBookmarkActor}
      />
    </>
  );
}

export default ViewActor;
