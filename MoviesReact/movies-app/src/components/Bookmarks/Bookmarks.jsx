import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "../../redux/store";
import { getBookmarks } from "../../redux/slices/bookmark";
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
function Bookmarks() {
  const dispatch = useDispatch();
  const { bookmarks, isLoading } = useSelector((state) => state.bookmark);
  const [page, setPages] = useState(1);
  useEffect(() => {
    dispatch(getBookmarks(page));
  }, [page, dispatch]);
  console.log(bookmarks);
  return (
    <div
      style={{
        backgroundColor: "black",
      }}
      className="bookmarks bg-dark"
    >
      <div className="container">
        <Pagination
          onChange={(event, value) => {
            setPages(value);
          }}
          siblingCount={2}
          boundaryCount={6}
          sx={{ background: "grey", color: "grey" }}
          count={bookmarks.totalPage}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
        <div className="row">
          <div className="col-md-2">
            <FilterBar forBookmark={true} />
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
                  {bookmarks.bookmarks.map((bookmark, index) => (
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
                            {bookmark.fullName}
                          </h5>
                          <p
                            className="card-text"
                            style={{ fontSize: "20px", fontFamily: "Poppins" }}
                          >
                            {bookmark.profession}
                          </p>
                          <p
                            className="card-text"
                            style={{ fontSize: "20px", fontFamily: "Poppins" }}
                          >
                            Aged:
                            {bookmark.deathYear !== "    "
                              ? parseInt(bookmark.deathYear) -
                                parseInt(bookmark.birthYear)
                              : new Date().getFullYear() -
                                parseInt(bookmark.birthYear)}
                          </p>
                          <p
                            className="card-text"
                            style={{ fontSize: "20px", fontFamily: "Poppins" }}
                          >
                            {bookmark.birthYear} -{" "}
                            {bookmark.deathYear !== "    "
                              ? bookmark.deathYear
                              : "Still Alive"}
                          </p>
                          <Link
                            to={`/bookmark/${bookmark.nCost}`}
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
              {/* Add more cards for other bookmarks as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookmarks;
