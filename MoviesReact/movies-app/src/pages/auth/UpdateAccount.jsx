// Update.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "../../redux/slices/user";
import { useSelector, useDispatch } from "../../redux/store";
import { Box, CircularProgress, Button } from "@mui/material";
import { useSnackbar } from "../../components/Snackbar";

function Update() {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(user ? user.firstName : "");

  const [lastName, setLastName] = useState(user ? user.lastName : "");

  const [email, setEmail] = useState(user ? user.email : "");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const isErrorRepeart = () => {
    if (repeatPassword !== password) {
      return false;
    } else {
      return true;
    }
  };
  const updateAccount = async () => {
    console.log(email, password);
    try {
      console.log("Show login message");
      if (isErrorRepeart()) {
        console.log(password);
        const response = await dispatch(
          updateProfile(
            user.userId,
            email,
            password,
            firstName,
            lastName,
            repeatPassword
          )
        );
        if (response) {
          console.log("Show login message");
          enqueueSnackbar("Updated successfully", { variant: "success" });

          navigate("/");
        } else {
          console.log("Show error message");
          enqueueSnackbar("Error with update", { variant: "error" });
        }
      } else {
        console.log("Show error message");
        enqueueSnackbar("Passwords dont match", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Error with update", { variant: "error" });
    }
  };
  return (
    <div className="update">
      <div className="template d-flex justify-content-center align-items-center vh-100 bg-primary navbar navbar-expand-lg navbar-light bg-dark">
        <div
          className="form_container p-5 rounded bg-white"
          style={{ width: "550px", padding: "30px", margin: "20px" }}
        >
          <form>
            <h3 className="text-center">Update Account</h3>
            <div className="mb-3">
              <label htmlFor="fname">First Name</label>
              <input
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                defaultValue={user.firstName}
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
                defaultValue={user.lastName}
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
                defaultValue={user.email}
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
              <label htmlFor="password">Repeat Password</label>
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
                  updateAccount();
                }}
                className="btn btn-primary"
                style={{ padding: "15px", fontSize: "18px" }}
                variant="contained"
                color="primary"
              >
                Update Account
              </Button>
            </div>
            <div></div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Update;
