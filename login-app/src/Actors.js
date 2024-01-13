import React from "react";
import Navbar from "./Navbar"; // Adjust the path based on your project structure
import { Link } from "react-router-dom";

function Actors() {
  return (
    <div className="actors bg-dark">
      {/* Navbar component without the navbar class */}
      <Navbar />

      <div className="template d-flex flex-column align-items-center" style={{ minHeight: '100vh', backgroundColor: '#black', color: 'white' }}>
        <div className="card mb-3 d-flex mt-5" style={{ maxWidth: '1050px', width: '100%' }}>
          <div className="row g-0">
            <div className="col-md-6">
              <img
                src="https://i0.wp.com/www.whiskeyriff.com/wp-content/uploads/2020/04/Wolf-Of-Wallstreet-Matthew-McConaughey-FULL-SCENE-HD-YouTube.jpg?fit=884%2C460&ssl=1"
                alt="Actor"
                className="img-fluid rounded-start"
                style={{ objectFit: 'cover', width: 'z%', height: '100%' }}
              />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h5 className="card-title" style={{ fontSize: '40px', color: 'black', fontFamily: 'Trajan Pro, serif' }}>Matthew McConaughey</h5>
                <p className="card-text" style={{ fontSize: '20px', fontFamily: 'Poppins' }}>
                  Matthew David McConaughey was born November 4, 1969, is an American actor.
                  He had his breakout role with a supporting performance in the coming-of-age comedy Dazed and Confused (1993).
                  After a number of supporting roles, his first success as a leading man came in the legal drama A Time to Kill (1996).
                </p>
                <Link to="#" className="btn btn-primary float-end mt-3" style={{ fontSize: '18px' }}>Read More</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-3 d-flex mt-5" style={{ maxWidth: '1050px', width: '100%' }}>
          <div className="row g-0">
            <div className="col-md-6">
              <img
                src="https://cdn.mos.cms.futurecdn.net/gaSGALeap2BEPfVb3CCG4C-1200-80.jpg"
                alt="Another Actor"
                className="img-fluid rounded-start"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h5 className="card-title" style={{ fontSize: '40px', color: 'black', fontFamily: 'Trajan Pro, serif' }}>John Travolta</h5>
                <p className="card-text" style={{ fontSize: '20px', fontFamily: 'Poppins' }}>
                  John Joseph Travolta (born February 18, 1954) is an American actor. He became prominent during the 1970s, appearing on the television
                  sitcom Welcome Back, Kotter (1975–1979) and starring in the box office successes Carrie (1976), Saturday Night Fever (1977), Grease (1978),
                  and Urban Cowboy (1980). 
                </p>
                <Link to="#" className="btn btn-primary float-end mt-3" style={{ fontSize: '18px' }}>Read More</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-3 d-flex mt-5" style={{ maxWidth: '1050px', width: '100%' }}>
          <div className="row g-0">
            <div className="col-md-6">
              <img
                src="https://cowgirlmagazine.com/wp-content/uploads/2020/07/jamie-foxx.jpg"
                alt="Another Actor"
                className="img-fluid rounded-start"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h5 className="card-title" style={{ fontSize: '40px', color: 'black', fontFamily: 'Trajan Pro, serif' }}>Jamie Foxx</h5>
              <p className="card-text" style={{ fontSize: '20px', fontFamily: 'Poppins' }}>
                  Eric Marlon Bishop (born December 13, 1967), known professionally as Jamie Foxx, is an American actor, comedian, and singer.
                  He received acclaim for his portrayal of Ray Charles in the film Ray (2004), winning the Academy Award, BAFTA, Screen Actors Guild Award,
                  and Golden Globe Award for Best Actor.
                </p>
                <Link to="#" className="btn btn-primary float-end mt-3" style={{ fontSize: '18px' }}>Read More</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Add more cards for other actors as needed */}
      </div>
    </div>
  );
}

export default Actors;
