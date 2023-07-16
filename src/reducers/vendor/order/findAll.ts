import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as vendorAPI from "api/vendor";

//* saga
function* getFindAllSaga(action: { payload: { isDesc: boolean } }) {
  try {
    const response: AxiosResponse = yield call(
      vendorAPI.orderFindAll,
      action.payload.isDesc
    );
    yield put(vendorOrderFindAllActions.getFindAllSuccess(response));
  } catch (error) {
    yield put(vendorOrderFindAllActions.getFindAllFailure(error));
  }
}

export function* vendorOrderFindAllSaga() {
  yield takeLatest(vendorOrderFindAllActions.getFindAll, getFindAllSaga);
}

//* reducer
const vendorOrderFindAll = createSlice({
  name: "vendorOrderFindAll",
  initialState: responseForm,
  reducers: {
    getFindAll(state, action) {
      state.message = responseForm.message;
    },
    getFindAllSuccess(state, action) {
      Object.assign(state, action.payload);
    },
    getFindAllFailure(state, action) {
      state.success = false;
      state.data = action.payload.error;
    },
    reset(state, action) {
      Object.assign(state, responseForm);
    },
  },
});

export const vendorOrderFindAllActions = vendorOrderFindAll.actions;

export default vendorOrderFindAll;
