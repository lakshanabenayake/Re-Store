import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import uiSlice from "./slices/uiSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      ui: uiSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// Export typed hooks
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
