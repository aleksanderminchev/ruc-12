// Signup.js
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Signup() {
    return (
        <div className="signup">
            <Navbar />
            <div className="template d-flex justify-content-center align-items-center vh-100 bg-primary bg-primary navbar navbar-expand-lg navbar-light bg-dark">
                <div className="form_container p-5 rounded bg-white" style={{ width: '550px', padding: '30px', margin: '20px' }}>
                    <form>
                        <h3 className="text-center">Sign Up</h3>
                        <div className="mb-3">
                            <label htmlFor="fname">First Name</label>
                            <input type="text" placeholder="Enter First Name" className="form-control" style={{ height: '40px', fontSize: '16px' }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lname">Last Name</label>
                            <input type="text" placeholder="Enter Last name" className="form-control" style={{ height: '40px', fontSize: '16px' }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder="Enter Email" className="form-control" style={{ height: '40px', fontSize: '16px' }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder="Enter Password" className="form-control" style={{ height: '40px', fontSize: '16px' }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password">Repeat Password</label>
                            <input type="password" placeholder="Repeat Password" className="form-control" style={{ height: '40px', fontSize: '16px' }} />
                        </div>
                        <div className="d-grid">
                            <button className="btn btn-primary" style={{ padding: '15px', fontSize: '18px' }}>Sign up</button>
                        </div>
                        <div>
                        </div>
                        <p className="text-end mt-3">
                            Already Registered<Link to="/login" className="ms-2">Sign in</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
