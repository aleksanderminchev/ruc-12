// Signup.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../redux/slices/user";
import { useSelector, useDispatch } from "../../redux/store";
import { Box, CircularProgress, Button } from "@mui/material";
function Signup() {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const isErrorRepeart = () => {
    if (repeatPassword !== password) {
      return false;
    } else {
      return true;
    }
  };
  const handleSignUp = async () => {
    console.log(email, password);
    try {
      console.log("Show login message");
      if (isErrorRepeart) {
        console.log(password);
        const response = await dispatch(
          signUp(email, password, firstName, lastName, repeatPassword)
        );
        if (response) {
          console.log("Show login message");
          navigate("/login");
        } else {
          console.log("Show error message");
        }
      } else {
        console.log("Show error message");
      }
    } catch (error) {
      console.log("Churka: ", error); // Handle errors, unauthorized, etc.
    }
  };
  return (
    <div className="signup">
      <div className="template d-flex justify-content-center align-items-center vh-100 bg-primary bg-primary navbar navbar-expand-lg navbar-light bg-dark">
        <div
          className="form_container p-5 rounded bg-white"
          style={{ width: "550px", padding: "30px", margin: "20px" }}
        >
          <form>
            <h3 className="text-center">Sign Up</h3>
            <div className="mb-3">
              <label htmlFor="fname">First Name</label>
              <input
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                type="text"
                placeholder="Enter First Name"
                className="form-control"
                style={{ height: "40px", fontSize: "16px" }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lname">Last Name</label>
              <input
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                type="text"
                placeholder="Enter Last name"
                className="form-control"
                style={{ height: "40px", fontSize: "16px" }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                placeholder="Enter Email"
                className="form-control"
                style={{ height: "40px", fontSize: "16px" }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder="Enter Password"
                className="form-control"
                style={{ height: "40px", fontSize: "16px" }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="repeatPassword">Repeat Password</label>
              <input
                onChange={(e) => {
                  setRepeatPassword(e.target.value);
                }}
                type="password"
                placeholder="Repeat Password"
                className="form-control"
                style={{ height: "40px", fontSize: "16px" }}
              />
            </div>
            <div className="d-grid">
              <Button
                onClick={() => {
                  handleSignUp();
                }}
                className="btn btn-primary"
                style={{ padding: "15px", fontSize: "18px" }}
              >
                Sign up
              </Button>
            </div>
            <div></div>
            <p className="text-end mt-3">
              Already Registered
              <Link to="/login" className="ms-2">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
