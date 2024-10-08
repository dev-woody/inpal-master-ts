import { createSlice } from "@reduxjs/toolkit";

//* reducer
const user = createSlice({
  name: "user",
  initialState: {
    loginAt: "",
    name: "",
    isTopLevel: false,
    email: "",
    phone: "",
    signInfo: {
      userId: "",
      password: null,
    },
  },
  reducers: {
    saveUser(state, action) {
      state.signInfo = action.payload.signInfo;
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.email = action.payload.email;
      state.loginAt = action.payload.loginAt;
      state.isTopLevel = action.payload.isTopLevel;
    },
    reset(state, action) {
      Object.assign(state, {
        loginAt: "",
        name: "",
        isTopLevel: false,
        email: "",
        signInfo: {
          userId: "",
          password: null,
        },
      });
    },
  },
});

export const userActions = user.actions;

export default user;
