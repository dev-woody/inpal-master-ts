import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as vendorAPI from "api/vendor";

//* saga
function* getFindAllByVendorIdSaga(action: {
  payload: { vendorId: string; isDesc: boolean };
}) {
  try {
    const response: AxiosResponse = yield call(
      vendorAPI.findAllByVendorId,
      action.payload.vendorId,
      action.payload.isDesc
    );
    yield put(orderFindByVendorIdActions.getFindAllByVendorIdSuccess(response));
  } catch (error) {
    yield put(orderFindByVendorIdActions.getFindAllByVendorIdFaulure(error));
  }
}

export function* orderFindByVendorIdSaga() {
  yield takeLatest(
    orderFindByVendorIdActions.getFindAllByVendorId,
    getFindAllByVendorIdSaga
  );
}

//* reducer
const orderFindByVendorId = createSlice({
  name: "orderFindByVendorId",
  initialState: responseForm,
  reducers: {
    getFindAllByVendorId(state, action) {
      state.message = responseForm.message;
    },
    getFindAllByVendorIdSuccess(state, action) {
      Object.assign(state, action.payload);
    },
    getFindAllByVendorIdFaulure(state, action) {
      state.success = false;
      state.data = action.payload.error;
    },
    reset(state, action) {
      Object.assign(state, responseForm);
    },
  },
});

export const orderFindByVendorIdActions = orderFindByVendorId.actions;

export default orderFindByVendorId;
