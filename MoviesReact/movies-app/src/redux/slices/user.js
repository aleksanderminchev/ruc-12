import { createSlice, Dispatch } from "@reduxjs/toolkit";

import axios from "../../utils/axios";

const initialState = {
  isLoading: false,
  error: null,
  users: [],
  user: null,
};

const slice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
      state.error = null;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload; // if you only write action.payload, you do not dot-in to the actual data, where all data for customer is
    },
    // GET Users
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload.data;
    },
    // GET User
    getUserSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload.data;
    },
    logOut(state, action) {
      state.error = null;
      state.isLoading = false;
      state.user = null;
    },
  },
});

export default slice.reducer;

export function login(email, password) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      console.log(email);
      console.log(password);
      const credentials = btoa(`${email}:${password}`);
      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        {},
        {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        }
      );
      if (response.status === 404) {
        throw new Error("User not found");
      } else {
        console.log(response);
        dispatch(slice.actions.getUserSuccess(response));
        return true;
      }
    } catch (error) {
      console.log(error);
      let errorMessage = "";
      if (error?.errors?.json._schema) {
        errorMessage = error?.errors?.json._schema[0];
      } else if (error?.errors?.json) {
        errorMessage = error?.errors.json[Object.keys(error?.errors.json)[0]];
      } else {
        errorMessage = error?.message;
      }
      dispatch(slice.actions.hasError(errorMessage));
      return false;
    }
  };
}
export function signUp(email, password, firstName, lastName, repeatPassword) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/signUp",
        {
          Email: email,
          FirstName: firstName,
          LastName: lastName,
          Pass: password,
          repeatPassword: repeatPassword,
        }
      );
      if (response.status === 404) {
        throw new Error("User not found");
      } else {
        console.log(response);
        dispatch(slice.actions.getUserSuccess(response));
        return true;
      }
    } catch (error) {
      console.log(error);
      let errorMessage = "";
      if (error?.errors?.json._schema) {
        errorMessage = error?.errors?.json._schema[0];
      } else if (error?.errors?.json) {
        errorMessage = error?.errors.json[Object.keys(error?.errors.json)[0]];
      } else {
        errorMessage = error?.message;
      }
      dispatch(slice.actions.hasError(errorMessage));
      return false;
    }
  };
}
export function logout() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(slice.actions.logOut());
      return true;
    } catch (error) {
      console.log(error);
      let errorMessage = "";
      if (error?.errors?.json._schema) {
        errorMessage = error?.errors?.json._schema[0];
      } else if (error?.errors?.json) {
        errorMessage = error?.errors.json[Object.keys(error?.errors.json)[0]];
      } else {
        errorMessage = error?.message;
      }
      dispatch(slice.actions.hasError(errorMessage));
      return false;
    }
  };
}

export function updateProfile(
  userId,
  email,
  password,
  firstName,
  lastName,
  repeatPassword
) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(
        `http://localhost:8000/api/user/${userId}`,
        {
          Email: email,
          FirstName: firstName,
          LastName: lastName,
          Pass: password,
          repeatPassword: repeatPassword,
        }
      );
      if (response.status === 404) {
        throw new Error("User not found");
      } else {
        console.log(response);
        dispatch(slice.actions.getUserSuccess(response));
        return true;
      }
    } catch (error) {
      console.log(error);
      let errorMessage = "";
      if (error?.errors?.json._schema) {
        errorMessage = error?.errors?.json._schema[0];
      } else if (error?.errors?.json) {
        errorMessage = error?.errors.json[Object.keys(error?.errors.json)[0]];
      } else {
        errorMessage = error?.message;
      }
      dispatch(slice.actions.hasError(errorMessage));
      return false;
    }
  };
}
export function editUser(form) {
  const data_to_update_user = {
    password: form.confirmNewPassword,
    old_password: form.oldPassword,
  };

  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // Note that user is determined on their current Token, so only the logged in user can change their own data.
      const response = await axios.put(`/api/user`, {
        ...data_to_update_user,
      });
      dispatch(slice.actions.getUserSuccess(response));
      return true; // Return true on success
    } catch (error) {
      // console.log(error);
      let errorMessage = "";
      if (error?.errors?.json._schema) {
        errorMessage = error?.errors?.json._schema[0];
      } else {
        errorMessage = error?.message;
      }
      dispatch(slice.actions.hasError(errorMessage));
      return false; // return false on error
    }
  };
}

// ----------------------------------------------------------------------
