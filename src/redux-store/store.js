import { configureStore } from '@reduxjs/toolkit';
import i18nReducer from './i18nSlice';
import questionReducer from './questionSlice';

export default configureStore({
  reducer: {
    question: questionReducer,
    i18n: i18nReducer,
  },
});
