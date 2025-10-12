import { configureStore } from '@reduxjs/toolkit';
import unitReducer from './slice/unitSlice';
import locationReducer from './slice/locationSlice';

export const store = configureStore({
  reducer: {
    unitReducer,
    locationReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
