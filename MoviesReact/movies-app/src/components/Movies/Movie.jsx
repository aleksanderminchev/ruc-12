import React from "react";

function Movie({ title, description, poster }) {
  return (
    <div
      style={{
        margin: "20px",
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <h2>{title}</h2>
      <img
        src={poster}
        alt={`${title} poster`}
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <p>{description}</p>
    </div>
  );
}

export default Movie;
