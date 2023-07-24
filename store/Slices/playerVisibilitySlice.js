import { createSlice, current } from "@reduxjs/toolkit";
export const playerVisibilitySlice = createSlice({
  name: "playerVisibility",
  initialState: {
    isVisible: false,
    opacity: 1,
    MusicList: [],
    index: 0,
  },
  reducers: {
    toggleVisibility: (state) => {
      state.isVisible = true;
    },
    opacityFull: (state) => {
      state.opacity = 1;
    },
    opacityZero: (state) => {
      state.opacity = 0;
    },
    setMusicData: (state, action) => {
      state.MusicList = action.payload;
    },
    setMusicindex: (state, action) => {
      state.index = action.payload;
    },
  },
});

export const {
  toggleVisibility,
  setMusicData,
  setMusicindex,
  opacityFull,
  opacityZero,
} = playerVisibilitySlice.actions;

export default playerVisibilitySlice.reducer;
