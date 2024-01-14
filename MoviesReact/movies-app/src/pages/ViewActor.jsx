import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getActor, getActorMovies } from "../redux/slices/actor";
import { useSelector, useDispatch } from "../redux/store";
import { Box, CircularProgress, Button } from "@mui/material";
import Actor from "../components/Actors/Actor";
function ViewActor() {
  // Replace these with actual data from your database or API
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const { actor, actorMovies, isLoading } = useSelector((state) => state.actor);
  console.log(isLoading);
  console.log(!actor);
  console.log(actor);
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
      <Actor actor={actor} actorMovies={actorMovies} isLoading={isLoading} />
    </>
  );
}

export default ViewActor;
