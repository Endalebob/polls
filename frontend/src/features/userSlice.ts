import Users from "<@>/pages/user";
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
    setUser: (state, action: PayloadAction<User>) => {
      console.log(action.payload)
      state.data.email = action.payload.data.email;
      state.data.username = action.payload.data.username;
      state.data.first_name = action.payload.data.first_name;
      state.data.last_name = action.payload.data.last_name;
      state.id = action.payload.id;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
