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
                      <Link
                        to={`/bookmark/${bookmark.nCost}`}
                        className="btn btn-primary mt-3"
                        style={{ fontSize: "18px" }}
                      >
                        Read More
                      </Link>
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
