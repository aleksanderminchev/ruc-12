import MoviesListRow from "../../components/Movies/MoviesListRow";
import { Button } from "@mui/material";

function Actor({ user, actor, isLoading, actorMovies, bookmarkActor }) {
  return actor ? (
    <div
      className="viewactor bg-dark"
      style={{
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8 text-light">
            <h2
              style={{
                fontSize: "55px",
                color: "yellow",
                fontFamily: "Trajan Pro, serif",
                fontWeight: "bold",
              }}
            >
              {actor.fullName}
              <div
                style={{ borderBottom: "1px solid white", paddingBottom: "10px" }}
              >
                {/* Empty div for the white line */}
              </div>
            </h2>
            <p
              style={{
                fontSize: "24px",
                borderBottom: "1px solid white",
                paddingBottom: "10px",
              }}
            >
              <strong>Profession:</strong> {actor.profession}
            </p>
          </div>
        </div>
      </div>
      {user ? (
        <Button
          sx={{ marginLeft: "5%", marginTop: "5%" }}
          size="large"
          variant="contained"
          onClick={() => {
            bookmarkActor(actor.nCost, user.userId);
          }}
        >
          Bookmark
        </Button>
      ) : (
        <></>
      )}
      <MoviesListRow
        movies={actorMovies ? actorMovies : []}
        isLoading={isLoading && !actor && actorMovies}
        title="Known for: "
      />
      {/* Read more link outside the container */}
    </div>
  ) : (
    <></>
  );
}

export default Actor;
