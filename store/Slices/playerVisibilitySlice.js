import { createSlice, current } from "@reduxjs/toolkit";
export const playerVisibilitySlice = createSlice({
  name: "playerVisibility",
  initialState: false,
  reducers: {
    toggleVisibility: (state) => {
      return (state = !state);
    },
  },
});

export const { toggleVisibility } = playerVisibilitySlice.actions;

export default playerVisibilitySlice.reducer;
