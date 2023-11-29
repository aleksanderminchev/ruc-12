import React from "react";
import Header from "./components/Header/Header";
import Movie from "./components/Movies/Movie";

function App() {
  return (
    <div>
      <Header />
      <div style={{ margin: "20px" }}>
        <h1 style={{ textAlign: "center" }}>My Movie App</h1>
        <Movie
          title="Inception"
          description="A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO."
          poster="https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
        />
        {/* More <Movie /> components can be added here */}
      </div>
    </div>
  );
}

export default App;
