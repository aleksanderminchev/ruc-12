import { createSlice, Dispatch } from "@reduxjs/toolkit";

import axios from "../../utils/axios";

const initialState = {
  isLoading: false,
  error: null,
  actors: {
    actors: [],
    pageSize: Number,
    totalPages: Number,
    totalRecords: Number,
  },
  actorMovies: [],
  actor: null,
};

const slice = createSlice({
  name: "actor",
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
    // GET ACTORS
    getActorsSuccess(state, action) {
      state.isLoading = false;
      state.actors = {
        actors: action.payload.data.data,
        pageSize: action.payload.data.pageSize,
        totalPage: action.payload.data.totalPages,
        totalRecords: action.payload.data.totalRecords,
      };
    },
    getActorSuccess(state, action) {
      state.isLoading = false;
      state.actor = action.payload.data;
    },
    getActorMoviesSuccess(state, action) {
      state.isLoading = false;
      state.actorMovies = action.payload.data;
    },
  },
});

export default slice.reducer;

export function getActors(pageNumber,profession,age) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/cast?page=${pageNumber}&age=${age}&profession=${profession}`, {
        withCredentials: true,
      });
      console.log(response);
      dispatch(slice.actions.getActorsSuccess(response));
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
export function getActor(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/cast/${id}`, {
        withCredentials: true,
      });
      console.log("SEND requst");
      console.log(response);
      dispatch(slice.actions.getActorSuccess(response));
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

export function getActorMovies(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/cast/movies/${id}`, {
        withCredentials: true,
      });
      console.log(response);
      dispatch(slice.actions.getActorMoviesSuccess(response));
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
export function bookMarkActor(actor_id, user_id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(
        `/api/bookmark/saveActor`,
        { NCost: actor_id, UserId: user_id },
        {
          withCredentials: true,
        }
      );
      console.log(response);
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
