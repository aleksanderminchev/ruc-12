import React from "react";
import { Link } from "react-router-dom";

function ViewMovie() {
  // Replace these with actual data from your database or API
  const movie = {
    title: "Pulp Fiction",
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.  The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    cast: [
      "John Travolta",
      "Samuel L. Jackson",
      "Tim Roth",
      "Laura Lovelace",
      "Phil LaMarr",
      "Bruce Willis",
    ],
    directors: ["Quentin Tarantino", "Roger Avary"],
    reviews: [{ user: "Jeff", comment: "Great movie!" }],
    imageUrl:
      "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p15684_p_v13_an.jpg", // Replace with the actual URL of the movie poster
  };

  // Function to split the cast into two groups
  const splitCast = (cast) => {
    const mid = Math.ceil(cast.length / 2);
    const firstHalf = cast.slice(0, mid);
    const secondHalf = cast.slice(mid);
    return [firstHalf, secondHalf];
  };

  // Split the cast into two halves
  const [castFirstHalf, castSecondHalf] = splitCast(movie.cast);

  return (
    <div
      className="viewmovie bg-dark"
      style={{ minHeight: "100vh", position: "relative" }}
    >
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <img src={movie.imageUrl} alt={movie.title} className="img-fluid" />
          </div>
          <div className="col-md-8 text-light">
            <h2
              style={{
                fontSize: "55px",
                color: "yellow",
                fontFamily: "Trajan Pro, serif",
                fontWeight: "bold",
              }}
            >
              {movie.title}
            </h2>
            <p
              style={{
                fontSize: "24px",
                borderBottom: "1px solid white",
                paddingBottom: "10px",
              }}
            >
              {movie.description}
            </p>
            <h4
              style={{
                fontSize: "40px",
                color: "yellow",
                paddingBottom: "10px",
              }}
            >
              Directors:
            </h4>
            <ul
              style={{ borderBottom: "1px solid white", paddingBottom: "10px" }}
            >
              {movie.directors.map((director, index) => (
                <li key={index} style={{ fontSize: "30px" }}>
                  {director}
                </li>
              ))}
            </ul>
            <div style={{ paddingBottom: "10px" }}>
              {/* Empty div for the white line */}
            </div>
            <h4
              style={{
                fontSize: "35px",
                color: "yellow",
                paddingBottom: "10px",
              }}
            >
              Cast:
            </h4>
            <div className="row">
              <div className="col-md-6">
                <ul>
                  {castFirstHalf.map((actor, index) => (
                    <li key={index} style={{ fontSize: "25px" }}>
                      {actor}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-md-6">
                <ul>
                  {castSecondHalf.map((actor, index) => (
                    <li key={index} style={{ fontSize: "25px" }}>
                      {actor}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div
              style={{ borderBottom: "1px solid white", paddingBottom: "10px" }}
            >
              {/* Empty div for the white line */}
            </div>
            <h4 style={{ fontSize: "35px", color: "yellow" }}>Reviews:</h4>
            <ul>
              {movie.reviews.map((review, index) => (
                <li key={index}>
                  <strong style={{ color: "yellow", fontSize: "25px" }}>
                    {review.user}:
                  </strong>{" "}
                  <span
                    style={{
                      color: "white",
                      fontSize: "23px",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    {review.comment}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Read more link outside the container */}
      <Link
        to="/read-more"
        className="btn btn-primary"
        style={{ position: "absolute", bottom: "10px", right: "65px" }}
      >
        Read more
      </Link>
    </div>
  );
}

export default ViewMovie;
