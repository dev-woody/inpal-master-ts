import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as goodAPI from "api/goods";

//* saga
function* getSetSellStatusSaga(action: {
  payload: {
    vendorId: string;
    goodsGroupId: string;
    optionId: string;
    status: string;
  };
}) {
  try {
    const response: AxiosResponse = yield call(
      goodAPI.setOptionStatus,
      action.payload.vendorId,
      action.payload.goodsGroupId,
      action.payload.optionId,
      action.payload.status
    );
    yield put(optionSetSellStatusActions.getSetSellStatusSuccess(response));
  } catch (error) {
    yield put(optionSetSellStatusActions.getSetSellStatusFailure(error));
  }
}

export function* optionSetSellStatusSaga() {
  yield takeLatest(
    optionSetSellStatusActions.getSetSellStatus,
    getSetSellStatusSaga
  );
}

//* reducer
const optionSetSellStatus = createSlice({
  name: "optionSetSellStatus",
  initialState: responseForm,
  reducers: {
    getSetSellStatus(state, action) {
      state.message = responseForm.message;
    },
    getSetSellStatusSuccess(state, action) {
      Object.assign(state, action.payload);
    },
    getSetSellStatusFailure(state, action) {
      state.success = false;
      state.data = action.payload.error;
    },
    reset(state, action) {
      Object.assign(state, responseForm);
    },
  },
});

export const optionSetSellStatusActions = optionSetSellStatus.actions;

export default optionSetSellStatus;
