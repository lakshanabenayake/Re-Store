import { createSlice } from "@reduxjs/toolkit";

const getInitialDarkMode = () => {
  const savedMode = localStorage.getItem('darkMode');
  return savedMode ? JSON.parse(savedMode) : true; // Default to true if no saved mode
}

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isLoading: false,
    error: null,
    darkMode: getInitialDarkMode()
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    setDarkMode:(state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
    }
  },
});

export const { startLoading, stopLoading, setDarkMode } = uiSlice.actions;
export default uiSlice.reducer;


