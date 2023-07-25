import { createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";
import * as masterAPI from "api/admin";
import createRequestSaga from "reducers/createRequestSaga";
import createAsyncReducers, {
  DataForm,
  ResponseData,
  createSingleReducers,
} from "reducers/createAsyncReducers";

const initialState: ResponseData = {
  signIn: {},
  signUp: {},
  findAll: {},
  findByUserId: {},
  update: {},
  checkPass: {},
  changePass: {},
};

export function* masterAdminSaga() {
  yield takeLatest(
    masterAdminActions.signIn,
    createRequestSaga("masterAdmin/signIn", masterAPI.signIn)
  );
  yield takeLatest(
    masterAdminActions.signUp,
    createRequestSaga("masterAdmin/signUp", masterAPI.signUp)
  );
  yield takeLatest(
    masterAdminActions.findAll,
    createRequestSaga("masterAdmin/findAll", masterAPI.findAll)
  );
  yield takeLatest(
    masterAdminActions.findByUserId,
    createRequestSaga("masterAdmin/findByUserId", masterAPI.findByUserId)
  );
  yield takeLatest(
    masterAdminActions.update,
    createRequestSaga("masterAdmin/update", masterAPI.update)
  );
  yield takeLatest(
    masterAdminActions.checkPass,
    createRequestSaga("masterAdmin/checkPass", masterAPI.checkPassword)
  );
  yield takeLatest(
    masterAdminActions.changePass,
    createRequestSaga("masterAdmin/changePass", masterAPI.changePass)
  );
}

//* reducer
const masterAdmin = createSlice({
  name: "masterAdmin",
  initialState,
  reducers: {
    ...createAsyncReducers({
      actionName: "signIn",
      reducerName: "signIn",
    })<any, DataForm, any>(),
    ...createAsyncReducers({
      actionName: "signUp",
      reducerName: "signUp",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "findAll",
      reducerName: "findAll",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "findByUserId",
      reducerName: "findByUserId",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "update",
      reducerName: "update",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "checkPass",
      reducerName: "checkPass",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "changePass",
      reducerName: "changePass",
    })<any, DataForm, string>(),
    ...createSingleReducers({
      actionName: "reset",
    })<any>(),
  },
});

export const masterAdminActions = masterAdmin.actions;

export default masterAdmin;
