import { Button } from "@mui/material";

function MovieTest({ movie, boomarkMovie, user }) {
  return movie ? (
    <div
      className="viewmovie bg-dark"
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
            />
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
              {movie.primaryTitle}
            </h2>
            <p
              style={{
                fontSize: "24px",
                borderBottom: "1px solid white",
                paddingBottom: "10px",
              }}
            >
              {movie.plot}
            </p>

            <div style={{ paddingBottom: "10px" }}>
              {/* Empty div for the white line */}
            </div>

            <div
              style={{ borderBottom: "1px solid white", paddingBottom: "10px" }}
            >
              {/* Empty div for the white line */}
            </div>
          </div>
        </div>
      </div>
      {user ? (
        <Button
        sx={{marginLeft:'5%',marginTop:'5%'}}
          size="large"
          variant="contained"
          onClick={() => {
            boomarkMovie(movie.titleID, user.userId);
          }}
        >
          Bookmark
        </Button>
      ) : (
        <></>
      )}

      {/* Read more link outside the container */}
    </div>
  ) : (
    <></>
  );
}

export default MovieTest;
