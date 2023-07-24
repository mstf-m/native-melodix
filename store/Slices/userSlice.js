import { createSlice, current } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      // console.log("redux:", action.payload);
      return (state = action.payload);
    },

    removeUser: () => {
      return (state = null);
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
