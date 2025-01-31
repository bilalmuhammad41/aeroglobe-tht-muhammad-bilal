import { configureStore } from "@reduxjs/toolkit";
import comboReducer from "./comboSlice";

export const store = configureStore({
  reducer: {
    combo: comboReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
