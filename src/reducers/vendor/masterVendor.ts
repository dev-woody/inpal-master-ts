import { createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";
import * as vendorAPI from "api/vendor";
import createRequestSaga from "reducers/createRequestSaga";
import createAsyncReducers, {
  DataForm,
  ResponseData,
  createSingleReducers,
} from "reducers/createAsyncReducers";

const initialState: ResponseData = {
  approve: {},
  setBizStatus: {},
  findAll: {},
  findById: {},
  findByName: {},
};

export function* masterVendorSaga() {
  yield takeLatest(
    masterVendorActions.approve,
    createRequestSaga("masterVendor/aprove", vendorAPI.approve)
  );
  yield takeLatest(
    masterVendorActions.setBizStatus,
    createRequestSaga("masterVendor/setBizStatus", vendorAPI.setBizStatus)
  );
  yield takeLatest(
    masterVendorActions.findAll,
    createRequestSaga("masterVendor/findAll", vendorAPI.findAll)
  );
  yield takeLatest(
    masterVendorActions.findById,
    createRequestSaga("masterVendor/findById", vendorAPI.findById)
  );
  yield takeLatest(
    masterVendorActions.findByName,
    createRequestSaga("masterVendor/findByName", vendorAPI.findByName)
  );
}

//* reducer
const masterVendor = createSlice({
  name: "masterVendor",
  initialState,
  reducers: {
    ...createAsyncReducers({
      actionName: "approve",
      reducerName: "approve",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "setBizStatus",
      reducerName: "setBizStatus",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "findAll",
      reducerName: "findAll",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "findByName",
      reducerName: "findByName",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "findById",
      reducerName: "findById",
    })<any, DataForm, string>(),
    ...createSingleReducers({
      actionName: "reset",
    })<any>(),
  },
});

export const masterVendorActions = masterVendor.actions;

export default masterVendor;
