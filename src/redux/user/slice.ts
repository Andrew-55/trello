import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "redux/user";

const initialState: UserState = {
  username: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<string>) {
      state.username = payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
