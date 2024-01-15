import React from "react";

const FilterBar = () => {
  return (
    <div className="filter-bars">
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <label htmlFor="genre">Genre:</label>
            <select className="form-select" id="genre">
              <option value="all">All Genres</option>
              <option value="action">Action</option>
              <option value="comedy">Comedy</option>
              <option value="horror">Horror</option>
              <option value="sci-fi">Sci-fi</option>
              {/* Add other genre options here */}
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="rating">Rating:</label>
            <select className="form-select" id="rating">
              <option value="all">All Ratings</option>
              <option value="best">Best</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
              {/* Add other rating options here */}
            </select>
          </div>
          <div className="col-md-2 space-between">
            <label htmlFor="reviews">Reviews:</label>
            <select className="form-select" id="reviews">
              <option value="all">All Reviews</option>
              <option value="10+">10+</option>
              <option value="50+">50+</option>
              <option value="100+">100+</option>
              {/* Add other review options here */}
            </select>
          </div>
          <div className="col-md-2 d-flex align-items-end">
            <button className="btn btn-primary btn-lg w-60 mt-3">Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
