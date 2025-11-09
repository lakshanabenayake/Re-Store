import { createSlice } from "@reduxjs/toolkit";

// Safe localStorage access for SSR
const getInitialDarkMode = () => {
  if (typeof window !== 'undefined') {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : true;
  }
  return true; // Default to true for SSR
};

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isLoading: false,
    error: null as string | null,
    darkMode: getInitialDarkMode(),
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    setDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      if (typeof window !== 'undefined') {
        localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
      }
    },
  },
});

export const { startLoading, stopLoading, setDarkMode } = uiSlice.actions;
export default uiSlice.reducer;
