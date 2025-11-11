import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedComponent: 0, // Default value
};

const componentSlice = createSlice({
  name: "component",
  initialState,
  reducers: {
    setSelectedComponent: (state, action) => {
      state.selectedComponent = action.payload; // Update selected component
    },
  },
});

export const { setSelectedComponent } = componentSlice.actions;
export default componentSlice.reducer;
