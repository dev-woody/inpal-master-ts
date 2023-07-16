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
    goodsItemId: string;
    status: string;
  };
}) {
  try {
    const response: AxiosResponse = yield call(
      goodAPI.setItemStatus,
      action.payload.vendorId,
      action.payload.goodsGroupId,
      action.payload.goodsItemId,
      action.payload.status
    );
    yield put(itemSetSellStatusActions.getSetSellStatusSuccess(response));
  } catch (error) {
    yield put(itemSetSellStatusActions.getSetSellStatusFailure(error));
  }
}

export function* itemSetSellStatusSaga() {
  yield takeLatest(
    itemSetSellStatusActions.getSetSellStatus,
    getSetSellStatusSaga
  );
}

//* reducer
const itemSetSellStatus = createSlice({
  name: "itemSetSellStatus",
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

export const itemSetSellStatusActions = itemSetSellStatus.actions;

export default itemSetSellStatus;
