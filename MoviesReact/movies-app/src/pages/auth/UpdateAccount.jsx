// Update.js
import React from "react";
import Navbar from "./Navbar"; // Adjust the path based on your project structure

function Update() {

    return (
        <div className="update">
            <div className="template d-flex justify-content-center align-items-center vh-100 bg-primary navbar navbar-expand-lg navbar-light bg-dark">
                <div className="form_container p-5 rounded bg-white" style={{ width: '550px', padding: '30px', margin: '20px' }}>
                    <form>
                        <h3 className="text-center">Update Account</h3>
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
                            <button className="btn btn-primary" style={{ padding: '15px', fontSize: '18px' }}>Update Account</button>
                        </div>
                        <div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Update;
