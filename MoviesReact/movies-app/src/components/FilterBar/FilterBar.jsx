// FilterBar.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/slices/movie";

const FilterBar = ({ forActor }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.movies.filters); // Assuming your Redux slice is named 'movies'

  const handleFilterChange = (filterType, value) => {
    dispatch(setFilter({ filterType, value }));
  };

  const handleApplyFilters = () => {
    // Dispatch an action or use a callback to apply filters
    console.log("Applying filters:", filters);
    // You can dispatch an action or trigger a callback to fetch filtered data here
  };
  return (
    <>
      {forActor ? (
        <div className="col-lg-12 flex-column align-items-stretch">
          <div className="rol-lg-12 flex-row align-items-stretch">
            <label htmlFor="age_range">Age range:</label>
            <select className="form-select" id="age range" value={filters.age_range} onChange={(e) => handleFilterChange("age range", e.target.value)}>
              <option value="all">All ages</option>
              <option value="0-19">0-19</option>
              <option value="20-39">20-39</option>
              <option value="40-59">40-59</option>
              <option value="60-89">60-89</option>
              <option value="90+">90+</option>
              {/* Add other age options here */}
            </select>
          </div>
          <div className="rol-lg-12 flex-row align-items-stretch">
            <label htmlFor="profession">Profession:</label>
            <select className="form-select" id="profession" value={filters.profession} onChange={(e) => handleFilterChange("profession", e.target.value)}>
              <option value="all">All professions</option>
              <option value="actor">Actor</option>
              <option value="actress">Actress</option>
              <option value="soundrack">Soundrack</option>
              <option value="product">Product</option>
              <option value="director">Director</option>
              <option value="writer">Writer</option>
              {/* Add other profession options here */}
            </select>
          </div>
          <div className="rol-lg-12 ">
            <button className="btn btn-primary btn-lg w-100" onClick={handleApplyFilters}>Apply</button>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <label htmlFor="genre">Genre:</label>
            <select className="form-select" id="genre" value={filters.genre} onChange={(e) => handleFilterChange("genre", e.target.value)}>
              <option value="all">All Genres</option>
              <option value="action">Action</option>
              <option value="comedy">Comedy</option>
              <option value="horror">Horror</option>
              <option value="sci-fi">Sci-fi</option>
              {/* Add other genre options here */}
            </select>
          </div>
          <div className="rol-lg-12  flex-column align-items-start">
            <label htmlFor="rating">Rating:</label>
            <select className="form-select" id="rating" value={filters.rating} onChange={(e) => handleFilterChange("rating", e.target.value)}>
              <option value="all">All Ratings</option>
              <option value="5 stars">5 stars</option>
              <option value="4 stars">4 stars</option>
              <option value="3 stars">3 stars</option>
              <option value="2 stars">2 stars</option>
              <option value="1 star">1 star</option>
              {/* Add other rating options here */}
            </select>
          </div>
          <div>
            <label htmlFor="reviews">Reviews:</label>
            <select className="form-select" id="reviews" value={filters.reviews} onChange={(e) => handleFilterChange("reviews", e.target.value)}>
              <option value="all">All Reviews</option>
              <option value="10+">10+</option>
              <option value="50+">50+</option>
              <option value="100+">100+</option>
              {/* Add other review options here */}
            </select>
          </div>
          <div>
            <button className="btn btn-primary btn-lg w-100" onClick={handleApplyFilters}>Apply</button>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterBar;
