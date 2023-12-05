import { createSlice, Dispatch } from "@reduxjs/toolkit";

import axios from "../../utils/axios";

const initialState = {
  isLoading: false,
  error: null,
  actors: [],
  mostPopularActors: [],
  actor: null,
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
    // DELETE User
    deleteCustomerSuccess(state, action) {
      state.isLoading = false;
      state.user = null;
    },
  },
});

export default slice.reducer;

export function getUsers() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/api/users");
      dispatch(slice.actions.getUsersSuccess(response.data));
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
