import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import flightsReducer from "../components/flightsSlice"

export const store = configureStore({
  reducer: {
    flights: flightsReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
