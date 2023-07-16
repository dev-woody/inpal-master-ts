import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as minPointAPI from "api/minPoint";

//* saga
function* postRegisterSaga(action: { payload: { data: object } }) {
  try {
    const response: AxiosResponse = yield call(
      minPointAPI.register,
      action.payload.data
    );
    yield put(minPointRegisterActions.postRegisterSuccess(response));
  } catch (error) {
    yield put(minPointRegisterActions.postRegisterFailure(error));
  }
}

export function* minPointRegisterSaga() {
  yield takeLatest(minPointRegisterActions.postRegister, postRegisterSaga);
}

//* reducer
const minPointRegister = createSlice({
  name: "minPointRegister",
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

export const minPointRegisterActions = minPointRegister.actions;

export default minPointRegister;
