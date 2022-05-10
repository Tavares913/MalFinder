import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    rootUser: null,
  },
  reducers: {
    setRootUser(state, action) {
      state.rootUser = action.payload;
    },
  },
});

export default userSlice;
export const userActions = userSlice.actions;
