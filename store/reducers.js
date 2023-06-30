import { combineReducers } from "@reduxjs/toolkit";
import playerVisibilitySlice from "./Slices/playerVisibilitySlice";

const reducers = combineReducers({
  playerVisibility: playerVisibilitySlice,
});

export default reducers;
