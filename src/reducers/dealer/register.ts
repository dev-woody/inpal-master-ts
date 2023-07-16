import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as dealerAPI from "api/dealer";

//* saga
function* getRegisterSaga(action: { payload: { id: string } }) {
  try {
    const response: AxiosResponse = yield call(
      dealerAPI.register,
      action.payload.id
    );
    yield put(dealerRegisterActions.getRegisterSuccess(response));
  } catch (error) {
    yield put(dealerRegisterActions.getRegisterFailure(error));
  }
}

export function* dealerRegisterSaga() {
  yield takeLatest(dealerRegisterActions.getRegister, getRegisterSaga);
}

//* reducer
const dealerRegister = createSlice({
  name: "dealerRegister",
  initialState: responseForm,
  reducers: {
    getRegister(state, action) {
      state.message = responseForm.message;
    },
    getRegisterSuccess(state, action) {
      Object.assign(state, action.payload);
    },
    getRegisterFailure(state, action) {
      state.success = false;
      state.data = action.payload.error;
    },
    reset(state, action) {
      Object.assign(state, responseForm);
    },
  },
});

export const dealerRegisterActions = dealerRegister.actions;

export default dealerRegister;
