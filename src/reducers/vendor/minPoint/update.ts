import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as minPointAPI from "api/minPoint";

//* saga
function* postUpdateSaga(action: { payload: { data: object } }) {
  try {
    const response: AxiosResponse = yield call(
      minPointAPI.update,
      action.payload.data
    );
    yield put(minPointUpdateActions.postUpdateSuccess(response));
  } catch (error) {
    yield put(minPointUpdateActions.postUpdateFailure(error));
  }
}

export function* minPointUpdateSaga() {
  yield takeLatest(minPointUpdateActions.postUpdate, postUpdateSaga);
}

//* reducer
const minPointUpdate = createSlice({
  name: "minPointUpdate",
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

export const minPointUpdateActions = minPointUpdate.actions;

export default minPointUpdate;
