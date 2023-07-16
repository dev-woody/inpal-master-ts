import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as dealerAPI from "api/dealer";

//* saga
function* getFindAllSaga(action: {
  payload: { dealerId: string; isDesc: boolean };
}) {
  try {
    const response: AxiosResponse = yield call(
      dealerAPI.orderFindAll,
      action.payload.dealerId,
      action.payload.isDesc
    );
    yield put(dealerOrderFindAllActions.getFindAllSuccess(response));
  } catch (error) {
    yield put(dealerOrderFindAllActions.getFindAllFailure(error));
  }
}

export function* dealerOrderFindAllSaga() {
  yield takeLatest(dealerOrderFindAllActions.getFindAll, getFindAllSaga);
}

//* reducer
const dealerOrderFindAll = createSlice({
  name: "dealerOrderFindAll",
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

export const dealerOrderFindAllActions = dealerOrderFindAll.actions;

export default dealerOrderFindAll;
