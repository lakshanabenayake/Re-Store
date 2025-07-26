import { configureStore, legacy_createStore } from "@reduxjs/toolkit";
import counterReducer, { CounterSlice } from "../../features/contact/conterReducer";
import { useDispatch, useSelector } from "react-redux";

export function configureTheStore() {
    return legacy_createStore(counterReducer);
}

export const store = configureStore({
    reducer: {
        counter: CounterSlice.reducer,
    }
})
 
// Export the type of the store's state for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();