import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as vendorAPI from "api/vendor";

//* saga
function* getFIndByIdSaga(action: {
  payload: { vendorId: string; isDesc: boolean };
}) {
  try {
    const response: AxiosResponse = yield call(
      vendorAPI.paymentFindById,
      action.payload.vendorId,
      action.payload.isDesc
    );
    yield put(paymentFindByIdActions.getFindByIdSuccess(response));
  } catch (error) {
    yield put(paymentFindByIdActions.getFindByIdFailure(error));
  }
}

export function* paymentFindByIdSaga() {
  yield takeLatest(paymentFindByIdActions.getFindById, getFIndByIdSaga);
}

//* reducer
const paymentFindById = createSlice({
  name: "paymentFindById",
  initialState: responseForm,
  reducers: {
    getFindById(state, action) {
      state.message = responseForm.message;
    },
    getFindByIdSuccess(state, action) {
      Object.assign(state, action.payload);
    },
    getFindByIdFailure(state, action) {
      state.success = false;
      state.data = action.payload.error;
    },
    reset(state, action) {
      Object.assign(state, responseForm);
    },
  },
});

export const paymentFindByIdActions = paymentFindById.actions;

export default paymentFindById;
