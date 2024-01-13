import React from "react";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Movie from "./components/Movies/Movie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store";
import ScrollToTop from "./components/scroll-to-top";
import Actors from "./components/Actors/Actors";
import MoviesList from "./components/Movies/MoviesList";
import MoviesListRow from "./components/Movies/MoviesListRow";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div style={{ backgroundColor: "black", color: "grey" }}>
      <HelmetProvider>
        <Router>
          <ReduxProvider store={store}>
            <ScrollToTop />
            <Header />
            <div style={{ margin: "20px" }}>
              <div style={{ margin: "20px" }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/movies" element={<MoviesList />} />
                  <Route path="/moviesList" element={<MoviesListRow />} />

                  <Route
                    path="/movie"
                    element={
                      <>
                        <h1 style={{ textAlign: "center" }}>My Movie App</h1>
                        <Movie
                          title="Inception"
                          description="A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO."
                          poster="https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
                        />
                      </>
                    }
                  />
                  <Route
                    path="/actors"
                    element={
                      <div className="actors bg-dark">
                        <Actors
                          title="Inception"
                          description="A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO."
                          poster="https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
                        />
                      </div>
                    }
                  />
                  {/* You can add more routes here */}
                </Routes>
              </div>

              {/* More <Movie /> components can be added here */}
            </div>
          </ReduxProvider>
        </Router>
      </HelmetProvider>
    </div>
  );
}

export default App;
