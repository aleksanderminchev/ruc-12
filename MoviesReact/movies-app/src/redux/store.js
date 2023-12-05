// Import necessary dependencies from Redux and Redux Persist
import {
  configureStore
} from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux';
import {
  persistStore,
  persistReducer
} from 'redux-persist';
import rootReducer, {
  rootPersistConfig
} from './rootReducer';

// ----------------------------------------------------------------------
// Define RootState type, which is derived from the rootReducer

// Define AppDispatch type, which is derived from the store.dispatch function

// Create a Sentry Redux enhancer


// Configure the Redux store with the persisted rootReducer and middleware options
const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

// Create a persistor instance to handle the persistence of the store
const persistor = persistStore(store);

// Destructure the dispatch function from the store
const {
  dispatch
} = store;
// Create a typed useSelector hook with RootState type
const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();

export {
  store,
  persistor,
  dispatch,
  useSelector,
  useDispatch
};