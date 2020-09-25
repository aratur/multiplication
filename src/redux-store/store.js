import { configureStore } from '@reduxjs/toolkit';
import resultsReducer from './resultsSlice';
import rangeReducer from './rangeSlice';
import i18nReducer from './i18nSlice';

export default configureStore({
  reducer: {
    results: resultsReducer,
    range: rangeReducer,
    i18n: i18nReducer,
  },
});
