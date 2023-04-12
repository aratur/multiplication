import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  createMigrate,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import i18nReducer from './i18nSlice';
import questionReducer from './questionSlice';
import migrations from './migrations';

const questionsConfig = {
  key: 'question',
  storage,
  version: 1,
  whitelist: ['pending', 'correct', 'incorrect', 'gems'],
  migrate: createMigrate(migrations, { debug: false }),
};

const store = configureStore({
  reducer: {
    question: persistReducer(questionsConfig, questionReducer),
    i18n: i18nReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
