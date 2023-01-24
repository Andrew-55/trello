import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string;
}

const initialState: UserState = {
  username: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
