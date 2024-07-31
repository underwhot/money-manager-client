import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { User } from "@/types/types";

interface UserState {
  user: User | null;
  isAuth: boolean;
}

const initialState: UserState = {
  user: null,
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectCount = (state: RootState) => state.user;

export default userSlice.reducer;