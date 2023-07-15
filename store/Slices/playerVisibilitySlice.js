import { createSlice, current } from "@reduxjs/toolkit";
export const playerVisibilitySlice = createSlice({
  name: "playerVisibility",
  initialState: {
    isVisible: false,
    MusicList: [],
    index: 0,
  },
  reducers: {
    toggleVisibility: (state) => {
      state.isVisible = true;
    },
    setMusicData: (state, action) => {
      state.MusicList = action.payload;
    },
    setMusicindex: (state, action) => {
      state.index = action.payload;
    },
  },
});

export const { toggleVisibility, setMusicData, setMusicindex } =
  playerVisibilitySlice.actions;

export default playerVisibilitySlice.reducer;
