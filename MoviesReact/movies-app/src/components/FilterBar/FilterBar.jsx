// FilterBar.js
import React, { useState } from "react";
import { Button } from "@mui/material";
const FilterBar = ({ forActor, applyFilters }) => {

  return (
    <>
      {forActor ? (
        <div className="col-lg-12 flex-column align-items-stretch">
          <div className="rol-lg-12 flex-row align-items-stretch">
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
          <div className="rol-lg-12  flex-column align-items-start">
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
          <div className="rol-lg-12  flex-column align-items-start">
            <label htmlFor="reviews">Reviews:</label>
            <select className="form-select" id="reviews">
              <option value="all">All Reviews</option>
              <option value="10+">10+</option>
              <option value="50+">50+</option>
              <option value="100+">100+</option>
              {/* Add other review options here */}
            </select>
          </div>
          <div className="rol-lg-12 ">
            <button className="btn btn-primary btn-lg w-100">Apply</button>
          </div>
        </div>
      ) : (
        <div>
          <div>
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
          <div>
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
          <div>
            <label htmlFor="reviews">Reviews:</label>
            <select className="form-select" id="reviews">
              <option value="all">All Reviews</option>
              <option value="10+">10+</option>
              <option value="50+">50+</option>
              <option value="100+">100+</option>
              {/* Add other review options here */}
            </select>
          </div>
          <div>
            <Button
              onClick={() => {
                applyFilters(genre, rating, reviews);
              }}
              className="btn btn-primary btn-lg w-100"
            >
              Apply
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterBar;
