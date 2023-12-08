import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar"; // Adjust the path based on your project structure

function Home() {
  return (
    <div className="home" style={{ minHeight: '100vh', backgroundColor: 'black', color: 'white', overflowX: 'hidden' }}>
      <Navbar />
      <div className="container mt-4">
        {/* Row 1: Newest Movies */}
        <div className="row mb-5">
          <h2 style={{fontSize: '40px', color: '#FFD700', fontWeight: 'bold'}}>Newest Movies</h2>
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
              </div>
            </div>
          </div>
        </div>

          {/* Row 1: Top 10 */}
          <div className="row mb-5">
            <h2 style={{fontSize: '40px', color: '#FFD700', fontWeight: 'bold'}}>Top 10</h2>
          {/* Movie 1 */}
          <div className="col-md-2">
            <div className="card">
              <img
                src="https://musicimage.xboxlive.com/catalog/video.movie.8D6KGWZL5SVS/image?locale=en-us&mode=crop&purposes=BoxArt&q=90&h=225&w=150&format=jpg"
                className="card-img-top"
                alt="Movie Poster"
              />
              <div className="card-body">
                <h5 className="card-title" style={{ fontSize: '24px', fontFamily: 'Georgia, serif' }}>Godfather</h5>
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
              </div>
            </div>
          </div>
        </div>

          {/* Row 1: Popular now */}
          <div className="row mb-5">
          <h2 style={{fontSize: '40px', color: '#FFD700', fontWeight: 'bold'}}>Popular now</h2>
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
              </div>
            </div>
          </div>
          {/* Movie 2 */}
          <div className="col-md-2">
            <div className="card">
              <img
                src="data:image/jpeg;base64,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"
                className="card-img-top"
                alt="Movie Poster"
              />
              <div className="card-body">
                <h5 className="card-title" style={{ fontSize: '24px', fontFamily: 'Georgia, serif' }}>Tetris</h5>
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
              </div>
            </div>
          </div>
        </div>

        {/* ... (Other Rows) ... */}
      </div>
    </div>
  );
}

export default Home;
