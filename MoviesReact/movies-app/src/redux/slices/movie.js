import { createSlice, Dispatch } from "@reduxjs/toolkit";

import axios from "../../utils/axios";

const initialState = {
  isLoading: false,
  error: null,
  movies: {
    movies: [],
    pageSize: Number,
    totalPages: Number,
    totalRecords: Number,
  },
  newestMovies: [],
  currentPopular: [],
  mostPopularMovies: [],
  movie: null,
};

const slice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
      state.error = null;
    },
    // set Filter
    setFilter: (state, action) => {
      state.filters[action.payload.filterType] = action.payload.value;
    },
    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload; // if you only write action.payload, you do not dot-in to the actual data, where all data for customer is
    },
    // GET MOVIES
    getMoviesSuccess(state, action) {
      state.isLoading = false;
      state.movies = {
        movies: action.payload.data.data,
        pageSize: action.payload.data.pageSize,
        totalPage: action.payload.data.totalPages,
        totalRecords: action.payload.data.totalRecords,
      };
    },
    getMoviesNewestSuccess(state, action) {
      state.isLoading = false;
      state.newestMovies = action.payload.data;
    },
    getMoviesCurrentPopularSuccess(state, action) {
      state.isLoading = false;
      state.currentPopular = action.payload.data;
    },
    getMoviesTopPopularSuccess(state, action) {
      state.isLoading = false;
      state.mostPopularMovies = action.payload.data;
    },
    // GET User
    getMovieSuccess(state, action) {
      state.isLoading = false;
      state.movie = action.payload.data;
    },
    // DELETE User
    deleteCustomerSuccess(state, action) {
      state.isLoading = false;
      state.user = null;
    },
  },
});

export default slice.reducer;
export const { setFilter } = slice.actions;
export function getMovie(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/title/${id}`, {
        withCredentials: true,
      });
      console.log("SEND requst");
      console.log(response);
      dispatch(slice.actions.getMovieSuccess(response));
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
export function getMovies(pageNumber) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/title?page=${pageNumber}`, {
        withCredentials: true,
      });
      console.log(response);
      dispatch(slice.actions.getMoviesSuccess(response));
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
export function bookMarkMovie(movie_id, user_id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(
        `/api/bookmark/save`,
        { TitleId: movie_id, UserId: user_id },
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
export function getMoviesNewest() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/title/current-year`, {
        withCredentials: true,
      });
      dispatch(slice.actions.getMoviesNewestSuccess(response));
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
export function getCurrentPopular() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/title/current-popular`, {
        withCredentials: true,
      });
      console.log(response);
      dispatch(slice.actions.getMoviesCurrentPopularSuccess(response));
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
export function getTopPopular() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/title/most-popular`, {
        withCredentials: true,
      });
      console.log(response);
      dispatch(slice.actions.getMoviesTopPopularSuccess(response));
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
