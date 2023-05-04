import User from "<@>/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: User = {
  data: {
    username: "",
    first_name: "",
    last_name: "",
    email: "",
  },
  id: -1,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<User>) => {
      state = action.payload;
    },
  },
});

export const { getUser } = userSlice.actions;
export default userSlice.reducer;
