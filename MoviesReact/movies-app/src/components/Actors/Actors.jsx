import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "../../redux/store";
import { getActors } from "../../redux/slices/actor";
import FilterBar from "../FilterBar/FilterBar";
import {
  Grid,
  Typography,
  Card,
  Stack,
  Pagination,
  Box,
  CircularProgress,
} from "@mui/material";
function Actors() {
  const dispatch = useDispatch();
  const { actors, isLoading } = useSelector((state) => state.actor);
  const [page, setPages] = useState(1);
  useEffect(() => {
    dispatch(getActors(page));
  }, [page, dispatch]);
  console.log(actors);
  return (
    <div
      style={{
        backgroundColor: "black",
      }}
      className="actors bg-dark"
    >
      <div className="container">
        <Pagination
          onChange={(event, value) => {
            setPages(value);
          }}
          siblingCount={2}
          boundaryCount={6}
          sx={{ background: "grey", color: "grey" }}
          count={actors.totalPage}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
        <div className="row">
          <div className="col-md-2">
            <FilterBar forActor={true} />
          </div>
          {/* Navbar component without the navbar class */}
          <div className="col-md-10">
            <div
              className="template "
              style={{
                backgroundColor: "black",
                minHeight: "100vh",
              }}
            >
              {isLoading ? (
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
                <div className="row row-cols-3">
                  {actors.actors.map((actor, index) => (
                    <div className="col-lg-3" key={index}>
                      <div
                        className="card mb-3"
                        style={{ height: "90%", minHeight: "90%" }}
                      >
                        <div className="card-body">
                          <h5
                            className="card-title"
                            style={{
                              fontSize: "40px",
                              color: "black",
                              fontFamily: "Trajan Pro, serif",
                            }}
                          >
                            {actor.fullName}
                          </h5>
                          <p
                            className="card-text"
                            style={{ fontSize: "20px", fontFamily: "Poppins" }}
                          >
                            {actor.profession}
                          </p>
                          <p
                            className="card-text"
                            style={{ fontSize: "20px", fontFamily: "Poppins" }}
                          >
                            Aged:
                            {actor.deathYear !== "    "
                              ? parseInt(actor.deathYear) -
                                parseInt(actor.birthYear)
                              : new Date().getFullYear() -
                                parseInt(actor.birthYear)}
                          </p>
                          <p
                            className="card-text"
                            style={{ fontSize: "20px", fontFamily: "Poppins" }}
                          >
                            {actor.birthYear} -{" "}
                            {actor.deathYear !== "    "
                              ? actor.deathYear
                              : "Still Alive"}
                          </p>
                          <Link
                            to="#"
                            className="btn btn-primary mt-3"
                            style={{ fontSize: "18px" }}
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {/* Add more cards for other actors as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Actors;
