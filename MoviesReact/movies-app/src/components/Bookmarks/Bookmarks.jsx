import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "../../redux/store";
import { getBookmarks } from "../../redux/slices/bookmarks";
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
  const { user } = useSelector((state) => state.user);
  const [page, setPages] = useState(1);
  useEffect(() => {
    dispatch(getBookmarks(user.userId, page));
  }, [user, page, dispatch]);
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
                      {bookmark.nCost ? (
                        <>
                          <Typography variant="h5" color="yellow">
                            {bookmark.name}
                          </Typography>
                          <Link
                            to={`/movie/${bookmark.nCost}`}
                            className="btn btn-primary mt-3"
                            style={{ fontSize: "18px" }}
                          >
                            View
                          </Link>
                        </>
                      ) : (
                        <>
                          <Typography variant="h5" color="yellow">
                            {bookmark.name}
                          </Typography>

                          <Link
                            to={`/actor/${bookmark.titleId}`}
                            className="btn btn-primary mt-3"
                            style={{ fontSize: "18px" }}
                          >
                            View
                          </Link>
                        </>
                      )}
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
