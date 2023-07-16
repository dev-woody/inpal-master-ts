import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as sellChargeAPI from "api/sellCharge";

//* saga
function* postUpdateSaga(action: { payload: { data: object } }) {
  try {
    const response: AxiosResponse = yield call(
      sellChargeAPI.update,
      action.payload.data
    );
    yield put(sellChargeUpdateActions.postUpdateSuccess(response));
  } catch (error) {
    yield put(sellChargeUpdateActions.postUpdateFailure(error));
  }
}

export function* sellChargeUpdateSaga() {
  yield takeLatest(sellChargeUpdateActions.postUpdate, postUpdateSaga);
}

//* reducer
const sellChargeUpdate = createSlice({
  name: "sellChargeUpdate",
  initialState: responseForm,
  reducers: {
    postUpdate(state, action) {
      state.message = responseForm.message;
    },
    postUpdateSuccess(state, action) {
      Object.assign(state, action.payload);
    },
    postUpdateFailure(state, action) {
      state.success = false;
      state.data = action.payload.error;
    },
    reset(state, action) {
      Object.assign(state, responseForm);
    },
  },
});

export const sellChargeUpdateActions = sellChargeUpdate.actions;

export default sellChargeUpdate;
