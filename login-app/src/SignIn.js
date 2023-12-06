// Login.js
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar"; // Adjust the path based on your project structure

function Login() {
    return (
        <div className="login">
            <Navbar />
            <div className="template d-flex justify-content-center align-items-center vh-100 bg-primary bg-primary navbar navbar-expand-lg navbar-light bg-dark">  
                <div className="form_container p-5 rounded bg-white" style={{ width: '500px', padding: '30px', margin: '20px' }}>
                    <form>
                        <h3 className="text-center">Sign In</h3>
                        <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder="Enter Email" className="form-control" style={{ height: '40px', fontSize: '16px' }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder="Enter password" className="form-control" style={{ height: '40px', fontSize: '16px' }} />
                        </div>
                        <div className="d-grid">
                            <button className="btn btn-primary" style={{ padding: '15px', fontSize: '18px' }}>Log in</button>
                        </div>
                        <div className="mb-2">
                            <input type="checkbox" className="custom-control custom-checkbox" id="check"/>
                            <label htmlFor="check" className="custom-input-label ms-2">
                                Remember me
                            </label>
                        </div>
                        <p className="text-end mt-2">
                            Forgotten <a href="">Password?</a><Link to="/signup" className="ms-2">Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
