function Actor({ actor }) {
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
            </h2>
            <p
              style={{
                fontSize: "24px",
                borderBottom: "1px solid white",
                paddingBottom: "10px",
              }}
            >
              {actor.plot}
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
      {/* Read more link outside the container */}
    </div>
  ) : (
    <></>
  );
}

export default Actor;
