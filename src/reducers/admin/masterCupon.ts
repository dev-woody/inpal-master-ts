import { createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";
import * as cuponAPI from "api/cupon";
import createRequestSaga from "reducers/createRequestSaga";
import createAsyncReducers, {
  DataForm,
  ResponseData,
  createSingleReducers,
} from "reducers/createAsyncReducers";

const initialState: ResponseData = {
  register: {},
  findAll: {},
  findById: {},
  update: {},
  setStatus: {},
};

export function* masterCuponSaga() {
  yield takeLatest(
    masterCuponActions.register,
    createRequestSaga("masterCupon/register", cuponAPI.register)
  );
  yield takeLatest(
    masterCuponActions.findAll,
    createRequestSaga("masterCupon/findAll", cuponAPI.findAll)
  );
  yield takeLatest(
    masterCuponActions.findById,
    createRequestSaga("masterCupon/findById", cuponAPI.findById)
  );
  yield takeLatest(
    masterCuponActions.update,
    createRequestSaga("masterCupon/update", cuponAPI.update)
  );
  yield takeLatest(
    masterCuponActions.setStatus,
    createRequestSaga("masterCupon/setStatus", cuponAPI.setStatus)
  );
}

//* reducer
const masterCupon = createSlice({
  name: "masterCupon",
  initialState,
  reducers: {
    ...createAsyncReducers({
      actionName: "register",
      reducerName: "register",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "findAll",
      reducerName: "findAll",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "findById",
      reducerName: "findById",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "update",
      reducerName: "update",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "setStatus",
      reducerName: "setStatus",
    })<any, DataForm, string>(),
    ...createSingleReducers({
      actionName: "reset",
    })<any>(),
  },
});

export const masterCuponActions = masterCupon.actions;

export default masterCupon;
