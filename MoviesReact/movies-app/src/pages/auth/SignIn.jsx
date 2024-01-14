// Login.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/slices/user";
import { useSelector, useDispatch } from "../../redux/store";
import { Box, CircularProgress, Button } from "@mui/material";
function Login() {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    console.log(email, password);
    try {
      console.log("Show login message");

      const response = await dispatch(login(email, password));
      if (response) {
        console.log("Show login message");
        navigate("/");
      } else {
        console.log("Show error message");
      }
    } catch (error) {
      console.log("Churka: ", error); // Handle errors, unauthorized, etc.
    }
  };
  return isLoading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <CircularProgress />
    </Box>
  ) : !user ? (
    <div className="login">
      <div className="template d-flex justify-content-center align-items-center vh-100 bg-primary bg-primary navbar navbar-expand-lg navbar-light bg-dark">
        <div
          className="form_container p-5 rounded bg-white"
          style={{ width: "500px", padding: "30px", margin: "20px" }}
        >
          <form>
            <h3 className="text-center">Sign In</h3>
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
                placeholder="Enter password"
                className="form-control"
                style={{ height: "40px", fontSize: "16px" }}
              />
            </div>
            <div className="d-grid">
              <Button
                onClick={() => {
                  handleLogin();
                }}
                style={{ padding: "15px", fontSize: "18px" }}
              >
                Log in
              </Button>
            </div>
            <div className="mb-2">
              <input
                type="checkbox"
                className="custom-control custom-checkbox"
                id="check"
              />
              <label htmlFor="check" className="custom-input-label ms-2">
                Remember me
              </label>
            </div>
            <p className="text-end mt-2">
              Forgotten <a href="">Password?</a>
              <Link to="/signup" className="ms-2">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Login;
