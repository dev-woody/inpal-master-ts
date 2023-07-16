import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as dealerAPI from "api/dealer";

//* saga
function* getSetStatusSaga(action: {
  payload: { dealerId: string; dealerStatus: string };
}) {
  try {
    const response: AxiosResponse = yield call(
      dealerAPI.setDealerStatus,
      action.payload.dealerId,
      action.payload.dealerStatus
    );
    yield put(setDealerStatusActions.getSetStatusSuccess(response));
  } catch (error) {
    yield put(setDealerStatusActions.getSetStatusFailure(error));
  }
}

export function* setDealerStatusSaga() {
  yield takeLatest(setDealerStatusActions.getSetStatus, getSetStatusSaga);
}

//* reducer
const setDealerStatus = createSlice({
  name: "setDealerStatus",
  initialState: responseForm,
  reducers: {
    getSetStatus(state, action) {
      state.message = responseForm.message;
    },
    getSetStatusSuccess(state, action) {
      Object.assign(state, action.payload);
    },
    getSetStatusFailure(state, action) {
      state.success = false;
      state.data = action.payload.error;
    },
    reset(state, action) {
      Object.assign(state, responseForm);
    },
  },
});

export const setDealerStatusActions = setDealerStatus.actions;

export default setDealerStatus;
