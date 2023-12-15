import React, { useState } from "react";
import Navbar from "./Navbar"; // Adjust the path based on your project structure
import FilterBar from "./FilterBar";

function Movies() {
    const [selectedGenre, setSelectedGenre] = useState("All Genres");
    const [selectedRating, setSelectedRating] = useState("All Ratings");
    const [selectedReview, setSelectedReview] = useState("All Reviews");
  
    const handleFilterChange = (event) => {
      const { id, value } = event.target;
  
      // Update state based on the changed filter
      switch (id) {
        case "genreSelect":
          setSelectedGenre(value);
          break;
        case "ratingSelect":
          setSelectedRating(value);
          break;
        case "reviewSelect":
          setSelectedReview(value);
          break;
        default:
          break;
      }
  
      // Add your logic to filter and update the displayed movies based on the selected filters
    };
  
 
    return (
        <div className="movies" style={{ minHeight: '100vh', backgroundColor: 'black', color: 'white', overflowX: 'hidden' }}>
         <Navbar />
            <div className="mt-2">
             <FilterBar handleFilterChange={handleFilterChange} />
            </div>
          <div className="container mt-3">
            {/* Row 1: Newest Movies */}
            <div className="row mb-3">
              <h2 style={{ fontSize: '40px', color: '#FFD700', fontWeight: 'bold' }}></h2>
              {/* Movie 1 */}
              <div className="col-md-2">
                <div className="card">
                  <img
                    src="https://m.media-amazon.com/images/I/51kagj+xxpL._SL500_._SL200_.jpg"
                    className="card-img-top"
                    alt="Movie Poster"
                  />
                  <div className="card-body">
                    <h5 className="card-title" style={{ fontSize: '24px', fontFamily: 'Georgia, serif' }}>Oppenheimer</h5>
                      <div className="mb-2">  
                      </div>
                  </div>
                </div>
            </div>
          {/* Movie 2 */}
          <div className="col-md-2">
            <div className="card">
              <img
                src="https://m.media-amazon.com/images/I/41n--fdnSLL._SL500_._SL200_.jpg"
                className="card-img-top"
                alt="Movie Poster"
              />
              <div className="card-body">
                <h5 className="card-title" style={{ fontSize: '24px', fontFamily: 'Georgia, serif' }}>Barbie</h5>
                 <div className="mb-2">
                </div>
              </div>
            </div>
          </div>
          {/* Movie 3 */}
          <div className="col-md-2">
            <div className="card">
              <img
                src="https://m.media-amazon.com/images/I/51wY+ppB5sL._SL500_._SL200_.jpg"
                className="card-img-top"
                alt="Movie Poster"
              />
              <div className="card-body">
              <h5 className="card-title" style={{ fontSize: '24px', fontFamily: 'Georgia, serif' }}>Indiana Jones</h5>
                 <div className="mb-2">
                 </div>
              </div>
            </div>
          </div>
          {/* Movie 4 */}
          <div className="col-md-2">
            <div className="card">
              <img
                src="https://www.legrandrex.com/mobile/images/films/NAPOLEON-AFFICHE.jpg"
                className="card-img-top"
                alt="Movie Poster"
              />
              <div className="card-body">
              <h5 className="card-title" style={{ fontSize: '24px', fontFamily: 'Georgia, serif' }}>Napoleon</h5>
                  <div className="mb-2">
                 </div>
              </div>
            </div>
          </div>
          {/* Movie 5 */}
          <div className="col-md-2">
            <div className="card">
              <img
                src="https://m.media-amazon.com/images/I/611TeCwdkbL._SL500_._SL200_.jpg"
                className="card-img-top"
                alt="Movie Poster"
              />
              <div className="card-body">
              <h5 className="card-title" style={{ fontSize: '24px', fontFamily: 'Georgia, serif' }}>Spider-man</h5>
                  <div className="mb-2">
                 </div>
              </div>
            </div>
          </div>
          {/* Movie 6 */}
          <div className="col-md-2">
            <div className="card">
              <img
                src="https://musicimage.xboxlive.com/catalog/video.movie.8D6KGWXZ7SJ1/image?locale=en-us&mode=crop&purposes=BoxArt&q=90&h=225&w=150&format=jpg"
                className="card-img-top"
                alt="Movie Poster"
              />
              <div className="card-body">
                <h5 className="card-title" style={{ fontSize: '24px', fontFamily: 'Georgia, serif' }}>Scream VI</h5>
                  <div className="mb-2">
                  </div>
            </div>
          </div>
        </div>

        <div className="container mt-3">
          {/* Row 2*/}
          <div className="row mt-4">
          <div className="col-md-2">
            <div className="card">
              <img
                src="https://musicimage.xboxlive.com/catalog/video.movie.8D6KGWZL5SVS/image?locale=en-us&mode=crop&purposes=BoxArt&q=90&h=225&w=150&format=jpg"
                className="card-img-top"
                alt="Movie Poster"
              />
              <div className="card-body">
                <h5 className="card-title" style={{ fontSize: '24px', fontFamily: 'Georgia, serif' }}>Godfather</h5>
                  <div className="mb-2">
                 </div>
              </div>
            </div>
          </div>
          {/* Movie 2 */}
          <div className="col-md-2">
            <div className="card">
              <img
                src="https://musicimage.xboxlive.com/catalog/video.movie.8D6KGWXN6Q06/image?locale=en-us&mode=crop&purposes=BoxArt&q=90&h=225&w=150&format=jpg"
                className="card-img-top"
                alt="Movie Poster"
              />
              <div className="card-body">
                <h5 className="card-title" style={{ fontSize: '24px', fontFamily: 'Georgia, serif' }}>Pulp Fiction</h5>
                  <div className="mb-2">
                  </div>
              </div>
            </div>
          </div>
          {/* Movie 3 */}
          <div className="col-md-2">
            <div className="card">
              <img
                src="https://3.bp.blogspot.com/-V_H5pPYzdTc/WFEUDbb6xBI/AAAAAAAABO8/YffRpW6lFy0BSjTPPQIoOaHyXrOX-qpXgCLcB/s200/Forrest%2BGump.jpg"
                className="card-img-top"
                alt="Movie Poster"
              />
              <div className="card-body">
                <h5 className="card-title" style={{ fontSize: '24px', fontFamily: 'Georgia, serif' }}>Forest Gump</h5>
                  <div className="mb-2">
                 </div>
              </div>
            </div>
          </div>
          {/* Movie 4 */}
          <div className="col-md-2">
            <div className="card">
              <img
                src="https://m.media-amazon.com/images/I/71YFxhhSRPL._AC_SY200_QL15_.jpg"
                className="card-img-top"
                alt="Movie Poster"
              />
              <div className="card-body">
                <h5 className="card-title" style={{ fontSize: '24px', fontFamily: 'Georgia, serif' }}>Fight club</h5>
                  <div className="mb-2">
                 </div>
              </div>
            </div>
          </div>
          {/* Movie 5 */}
          <div className="col-md-2">
            <div className="card">
              <img
                src="https://www.avoir-alire.com/local/cache-vignettes/L150xH200/arton14002-1f447.jpg?1578311387"
                className="card-img-top"
                alt="Movie Poster"
              />
              <div className="card-body">
                <h5 className="card-title" style={{ fontSize: '24px', fontFamily: 'Georgia, serif' }}>Inception</h5>
                  <div className="mb-2">
                 </div>
              </div>
            </div>
          </div>
          {/* Movie 6 */}
          <div className="col-md-2">
            <div className="card">
              <img
                src="https://musicimage.xboxlive.com/catalog/video.movie.8D6KGWXN6GQ6/image?locale=en-gb&mode=crop&purposes=BoxArt&q=90&h=225&w=150&format=jpg"
                className="card-img-top"
                alt="Movie Poster"
              />
              <div className="card-body">
                <h5 className="card-title" style={{ fontSize: '24px', fontFamily: 'Georgia, serif' }}>The matrix</h5>
                  <div className="mb-2">
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        <div className="container mt-3">
          {/* Row 3*/}
          <div className="row mt-4">
          {/* Movie 1 */}
          <div className="col-md-2">
            <div className="card">
              <img
                src="https://musicimage.xboxlive.com/catalog/video.movie.8D6KGWXZCWQJ/image?locale=en-us&mode=crop&purposes=BoxArt&q=90&h=225&w=150&format=jpg"
                className="card-img-top"
                alt="Movie Poster"
              />
              <div className="card-body">
                <h5 className="card-title" style={{ fontSize: '24px', fontFamily: 'Georgia, serif' }}>Black Demon</h5>
                  <div className="mb-2">
                  </div>
              </div>
            </div>
          </div>
          {/* Movie 2 */}
          <div className="col-md-2">
            <div className="card">
              <img
                src="https://m.media-amazon.com/images/I/51EJDH5UlgL._SL500_._SL200_.jpg"
                className="card-img-top"
                alt="Movie Poster"
              />
              <div className="card-body">
                <h5 className="card-title" style={{ fontSize: '24px', fontFamily: 'Georgia, serif' }}>Tetris</h5>
                  <div className="mb-2">
                 </div>
              </div>
            </div>
          </div>
          {/* Movie 3 */}
          <div className="col-md-2">
            <div className="card">
              <img
                src="https://m.media-amazon.com/images/I/51b5Mz14NtL._SL500_._SL200_.jpg"
                className="card-img-top"
                alt="Movie Poster"
              />
              <div className="card-body">
                <h5 className="card-title" style={{ fontSize: '24px', fontFamily: 'Georgia, serif' }}>Cocaine Bear</h5>
                 <div className="mb-2">
                 </div>
              </div>
            </div>
          </div>
          {/* Movie 4 */}
          <div className="col-md-2">
            <div className="card">
              <img
                src="https://m.media-amazon.com/images/I/51nozQ+hvfL._SL500_._SL200_.jpg"
                className="card-img-top"
                alt="Movie Poster"
              />
              <div className="card-body">
                <h5 className="card-title" style={{ fontSize: '24px', fontFamily: 'Georgia, serif' }}>Fast X</h5>
                  <div className="mb-2">
                 </div>
              </div>
            </div>
          </div>
          {/* Movie 5 */}
          <div className="col-md-2">
            <div className="card">
              <img
                src="https://m.media-amazon.com/images/I/41a0bQ8Ot7L._SL500_._SL200_.jpg"
                className="card-img-top"
                alt="Movie Poster"
              />
              <div className="card-body">
                <h5 className="card-title" style={{ fontSize: '24px', fontFamily: 'Georgia, serif' }}>Paint</h5>
                  <div className="mb-2">
                  </div>
              </div>
            </div>
          </div>
          {/* Movie 6 */}
          <div className="col-md-2">
            <div className="card">
              <img
                src="https://fr.web.img6.acsta.net/c_150_200/pictures/23/09/21/14/13/0160630.jpg"
                className="card-img-top"
                alt="Movie Poster"
              />
              <div className="card-body">
                 <h5 className="card-title" style={{ fontSize: '24px', fontFamily: 'Georgia, serif' }}>Old Dads</h5>
                  <div className="mb-2">
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* ... (Other Rows) ... */}
      </div>
    </div>
  </div>
  );
}

export default Movies;
