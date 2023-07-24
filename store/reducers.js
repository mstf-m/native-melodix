import { combineReducers } from "@reduxjs/toolkit";
import playerVisibilitySlice from "./Slices/playerVisibilitySlice";
import userSlice from "./Slices/userSlice";

const reducers = combineReducers({
  playerVisibility: playerVisibilitySlice,
  user: userSlice,
});

export default reducers;
