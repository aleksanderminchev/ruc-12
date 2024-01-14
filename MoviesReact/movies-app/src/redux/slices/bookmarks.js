import { createSlice, Dispatch } from "@reduxjs/toolkit";

import axios from "../../utils/axios";

const initialState = {
  isLoading: false,
  error: null,
  bookmarks: {
    bookmarks: [],
    pageSize: Number,
    totalPages: Number,
    totalRecords: Number,
  },
  bookmarkMovies: [],
  bookmark: null,
};

const slice = createSlice({
  name: "bookmark",
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
    // GET BOOKMARKS
    getBookmarksSuccess(state, action) {
      state.isLoading = false;
      state.bookmarks = {
        bookmarks: action.payload.data.data,
        pageSize: action.payload.data.pageSize,
        totalPage: action.payload.data.totalPages,
        totalRecords: action.payload.data.totalRecords,
      };
    },
    getBookmarkSuccess(state, action) {
      state.isLoading = false;
      state.bookmark = action.payload.data;
    },
    getBookmarkMoviesSuccess(state, action) {
      state.isLoading = false;
      state.bookmarkMovies = action.payload.data;
    },
  },
});

export default slice.reducer;

export function getBookmarks(pageNumber) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/cast?page=${pageNumber}`, {
        withCredentials: true,
      });
      console.log(response);
      dispatch(slice.actions.getBookmarksSuccess(response));
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
export function getBookmark(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/cast/${id}`, {
        withCredentials: true,
      });
      console.log("SEND requst");
      console.log(response);
      dispatch(slice.actions.getBookmarkSuccess(response));
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

export function getBookmarkMovies(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/cast/movies/${id}`, {
        withCredentials: true,
      });
      console.log(response);
      dispatch(slice.actions.getBookmarkMoviesSuccess(response));
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
