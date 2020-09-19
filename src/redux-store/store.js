import { configureStore } from '@reduxjs/toolkit';
import resultsReducer from './resultsSlice';
import rangeReducer from './rangeSlice';

export default configureStore({
  reducer: {
    results: resultsReducer,
    range: rangeReducer,
  },
});
