import { configureStore } from '@reduxjs/toolkit';
import darkReducer from './slices/darkSlice';

const store = configureStore({
  reducer: {
    dark: darkReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
