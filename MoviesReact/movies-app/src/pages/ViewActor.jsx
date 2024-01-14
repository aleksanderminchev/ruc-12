import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getActor } from "../../redux/slices/actor";
import { useSelector, useDispatch } from "../../redux/store";
import { Box, CircularProgress, Button } from "@mui/material";
function ViewActor() {
  // Replace these with actual data from your database or API
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const { actor, isLoading } = useSelector((state) => state.actor);
  console.log(isLoading);
  console.log(!actor);
  console.log(actor);
  useEffect(() => {
    if (id) {
      dispatch(getActor(id));
    }
  }, [dispatch, id]);
  // Function to split the cast into two groups

  return !isLoading && !actor ? (
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
    <></>
  );
}

export default ViewActor;
