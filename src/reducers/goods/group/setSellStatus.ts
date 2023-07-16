import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as goodAPI from "api/goods";

//* saga
function* getSetSellStatusSaga(action: {
  payload: { vendorId: string; goodsGroupId: string; status: string };
}) {
  try {
    const response: AxiosResponse = yield call(
      goodAPI.setSellStatus,
      action.payload.vendorId,
      action.payload.goodsGroupId,
      action.payload.status
    );
    yield put(goodsSetSellStatusActions.getSetSellStatusSuccess(response));
  } catch (error) {
    yield put(goodsSetSellStatusActions.getSetSellStatusFailure(error));
  }
}

export function* goodsSetSellStatusSaga() {
  yield takeLatest(
    goodsSetSellStatusActions.getSetSellStatus,
    getSetSellStatusSaga
  );
}

//* reducer
const goodsSetSellStatus = createSlice({
  name: "goodsSetSellStatus",
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

export const goodsSetSellStatusActions = goodsSetSellStatus.actions;

export default goodsSetSellStatus;
