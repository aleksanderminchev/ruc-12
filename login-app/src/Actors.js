// Actors.js
import React from "react";
import Navbar from "./Navbar"; // Adjust the path based on your project structure
import { Link } from "react-router-dom";

function Actors() {
    return (
        <div className="actors">
            <Navbar />
            <div className="template d-flex justify-content-center align-items-center vh-100 bg-primary bg-primary navbar navbar-expand-lg navbar-light bg-dark">
                <div className="card mb-3" style={{ maxWidth: '1000px' }}>
                    <div className="row g-0">
                        <div className="col-md-6">
                            <img
                                src="https://i0.wp.com/www.whiskeyriff.com/wp-content/uploads/2020/04/Wolf-Of-Wallstreet-Matthew-McConaughey-FULL-SCENE-HD-YouTube.jpg?fit=884%2C460&ssl=1"
                                alt="Actor"
                                className="img-fluid rounded-start"
                                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            />
                        </div>
                        <div className="col-md-6">
                            <div className="card-body">
                                <h5 className="card-title">Matthew McConaughey</h5>
                                <p className="card-text">
                                    Matthew David McConaughey was born November 4, 1969 is an American actor. 
                                    He had his breakout role with a supporting performance in the coming-of-age comedy Dazed and Confused (1993).
                                    After a number of supporting roles, his first success as a leading man came in the legal drama A Time to Kill (1996). 
                                    His career progressed with lead roles in the science fiction film Contact (1997), the historical drama Amistad (1997), and the war film U-571 (2000).
                                </p>
                                <Link to="#" className="btn btn-primary float-end mt-3" style={{ fontSize: '13px' }}>Read More</Link>
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
