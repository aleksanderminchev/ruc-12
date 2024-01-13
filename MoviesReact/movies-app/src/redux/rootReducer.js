import { combineReducers } from "redux";

import storage from "redux-persist/lib/storage";
// slices
import userReducer from "./slices/user";
import movieReducer from "./slices/movie";

// ----------------------------------------------------------------------

export const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const rootReducer = combineReducers({ user: userReducer,movie:movieReducer });

export default rootReducer;
