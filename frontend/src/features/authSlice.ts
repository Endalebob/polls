import { RootState } from "<@>/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface AuthState {
  token: string;
}

const initialState: AuthState = {
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<{ token: string }>) => {
      localStorage.setItem(
        "user",
        JSON.stringify({ token: action.payload.token })
      );
      state.token = action.payload.token;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;
export const { setUsers } = authSlice.actions;
export default authSlice.reducer;
