import React from "react";
import { Button } from "@mui/material";

function MovieTest({ movie, boomarkMovie, user, rateMovie }) {
  const [userRating, setUserRating] = React.useState(0);

  const StarRating = ({ value, maxValue, onRate }) => {
    const stars = [];

    const handleStarClick = (starValue) => {
      onRate(starValue);
      rateMovie(movie.titleID, user.userId, starValue);
    };

    for (let i = 1; i <= maxValue; i++) {
      const starClassName = i <= value ? "star-filled" : "star-empty";
      stars.push(
        <span
          key={i}
          className={`star ${starClassName}`}
          onClick={() => handleStarClick(i)}
          style={{
            fontSize: "40px", // Adjust the font size as per your requirement
            marginRight: "5px", // Add spacing between stars if needed
            cursor: user ? "pointer" : "default", // Make stars clickable only if user is logged in
            color: i <= value ? "yellow" : "gray", // Change color based on selected rating
          }}
        >
          &#9733;
        </span>
      );
    }

    return (
      <div className="star-rating" style={{ display: "inline-block" }}>
        {stars}
      </div>
    );
  };

  return movie ? (
    <div
      className="viewmovie bg-gray"
      style={{
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <img
              src={movie ? movie.poster : ""}
              alt={movie ? movie.primaryTitle : ""}
              className="img-fluid"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-md-8 text-light" style={{ position: "relative" }}>
            <h2
              style={{
                fontSize: "55px",
                color: "yellow",
                fontFamily: "Trajan Pro, serif",
                fontWeight: "bold",
                borderBottom: "1px solid white",
                paddingBottom: "10px",
                display: "flex",
                justifyContent: "space-between", // Align stars to the right
              }}
            >
              <span>{movie.primaryTitle}</span>
              <StarRating
                value={Math.round(movie.averageRating / 2)}
                maxValue={5}
                onRate={setUserRating}
              />
            </h2>

            {/* Add the interactive star rating component after the title */}

            <p
              style={{
                fontSize: "24px",
                borderBottom: "1px solid white",
                paddingBottom: "10px",
              }}
            >
              {movie.plot}
            </p>
            <p
              style={{
                fontSize: "24px",
                borderBottom: "1px solid white",
                paddingBottom: "10px",
              }}
            >
              Total Number of Reviews: {movie.numberOfVotes}
            </p>
            {/* Bookmark button */}
            {user && (
              <>
                <Button
                  sx={{
                    position: "absolute",
                    right: "30px",
                  }}
                  size="large"
                  variant="contained"
                  onClick={() => {
                    boomarkMovie(movie.titleID, user.userId);
                  }}
                >
                  Bookmark
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default MovieTest;
