// FilterBar.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FilterBar = ({ forActor, applyFiltersMovie, applyFiltersActor }) => {
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(0);
  const [age, setAge] = useState(0);
  const [profession, setProfession] = useState("");
  const handleApplyFilters = () => {
    applyFiltersMovie(genre, rating, reviews);
    // Dispatch an action or use a callback to apply filters
    // You can dispatch an action or trigger a callback to fetch filtered data here
  };
  const handleApplyFiltersActors = () => {
    applyFiltersActor(age, profession);
    // Dispatch an action or use a callback to apply filters
    // You can dispatch an action or trigger a callback to fetch filtered data here
  };
  return (
    <>
      {forActor ? (
        <div className="col-lg-12 flex-column align-items-stretch">
          <div className="rol-lg-12 flex-row align-items-stretch">
            <label htmlFor="age_range">Age range:</label>
            <select
              onChange={(e) => {
                setAge(e.target.value);
              }}
              className="form-select"
              id="age range"
              // onChange={(e) => handleFilterChange("age range", e.target.value)}
            >
              <option></option>
              <option value="19">0-19</option>
              <option value="39">20-39</option>
              <option value="59">40-59</option>
              <option value="89">60-89</option>
              <option value="90">90+</option>
              {/* Add other age options here */}
            </select>
          </div>
          <div className="rol-lg-12 flex-row align-items-stretch">
            <label htmlFor="profession">Profession:</label>
            <select
              onChange={(e) => {
                setProfession(e.target.value);
              }}
              className="form-select"
              id="profession"
              // onChange={(e) => handleFilterChange("profession", e.target.value)}
            >
              <option></option>
              <option value="actor">Actor</option>
              <option value="actress">Actress</option>
              <option value="soundtrack">Soundtrack</option>
              <option value="producer">Producer</option>
              <option value="director">Director</option>
              <option value="writer">Writer</option>
              {/* Add other profession options here */}
            </select>
          </div>
          <div className="rol-lg-12 mt-3">
            <button
              className="btn btn-primary btn-lg w-100"
              onClick={handleApplyFiltersActors}
            >
              Apply
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <label htmlFor="genre">Genre:</label>
            <select
              onChange={(e) => {
                setGenre(e.target.value);
              }}
              className="form-select"
              id="genre"
            >
              <option> </option>
              <option value="Action">Action</option>
              <option value="Comedy">Comedy</option>
              <option value="Horror">Horror</option>
              <option value="Adventure">Adventure</option>
              <option value="Romance">Romance</option>
              <option value="History">Drama</option>
              <option value="History">History</option>
              <option value="Sci-Fi">Sci-Fi</option>

              {/* Add other genre options here */}
            </select>
          </div>
          <div className="rol-lg-12  flex-column align-items-start">
            <label htmlFor="rating">Rating:</label>
            <select
              onChange={(e) => {
                setRating(e.target.value * 1.5);
              }}
              className="form-select"
              id="rating"
            >
              <option></option>
              <option value="5">5 stars</option>
              <option value="4">4 stars</option>
              <option value="3">3 stars</option>
              <option value="2">2 stars</option>
              <option value="1">1 star</option>
              {/* Add other rating options here */}
            </select>
          </div>
          <div>
            <label htmlFor="reviews">Reviews:</label>
            <select
              onChange={(e) => {
                setReviews(e.target.value * 2);
              }}
              className="form-select"
              id="reviews"
            >
              <option></option>
              <option value="10">10+</option>
              <option value="50">50+</option>
              <option value="100">100+</option>
              {/* Add other review options here */}
            </select>
          </div>
          <div>
            <button
              className="btn btn-primary btn-lg w-100 mt-3"
              onClick={handleApplyFilters}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterBar;
