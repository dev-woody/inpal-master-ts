import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as sellChargeAPI from "api/sellCharge";

//* saga
function* postRegisterSaga(action: { payload: { data: object } }) {
  try {
    const response: AxiosResponse = yield call(
      sellChargeAPI.register,
      action.payload.data
    );
    yield put(sellChargeRegisterActions.postRegisterSuccess(response));
  } catch (error) {
    yield put(sellChargeRegisterActions.postRegisterFailure(error));
  }
}

export function* sellChargeRegisterSaga() {
  yield takeLatest(sellChargeRegisterActions.postRegister, postRegisterSaga);
}

//* reducer
const sellChargeRegister = createSlice({
  name: "sellChargeRegister",
  initialState: responseForm,
  reducers: {
    postRegister(state, action) {
      state.message = responseForm.message;
    },
    postRegisterSuccess(state, action) {
      Object.assign(state, action.payload);
    },
    postRegisterFailure(state, action) {
      state.success = false;
      state.data = action.payload.error;
    },
    reset(state, action) {
      Object.assign(state, responseForm);
    },
  },
});

export const sellChargeRegisterActions = sellChargeRegister.actions;

export default sellChargeRegister;
