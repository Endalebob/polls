import authSlice from "<@>/features/authSlice";
import userSlice from "<@>/features/userSlice";
import { authApiSlice } from "<@>/services/authApi";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    user:userSlice,
    auth: authSlice,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authApiSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
