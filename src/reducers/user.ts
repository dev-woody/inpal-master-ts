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
      state.signInfo.userId = action.payload.adminInfo.signInfo.userId;
      state.name = action.payload.adminInfo.name;
      state.phone = action.payload.adminInfo.phone;
      state.email = action.payload.adminInfo.email;
      state.loginAt = action.payload.adminInfo.loginAt;
      state.isTopLevel = action.payload.adminInfo.isTopLevel;
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
