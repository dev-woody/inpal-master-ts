import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as minPointAPI from "api/minPoint";

//* saga
function* getFindByIdSaga(action: { payload: { data: object } }) {
  try {
    const response: AxiosResponse = yield call(
      minPointAPI.findById,
      action.payload.data
    );
    yield put(minPointFindByIdActions.getFindByIdSuccess(response));
  } catch (error) {
    yield put(minPointFindByIdActions.getFindByIdFailure(error));
  }
}

export function* minPointFindByIdSaga() {
  yield takeLatest(minPointFindByIdActions.getFindById, getFindByIdSaga);
}

//* reducer
const minPointFindById = createSlice({
  name: "minPointFindById",
  initialState: responseForm,
  reducers: {
    getFindById(state, action) {
      state.message = responseForm.message;
    },
    getFindByIdSuccess(state, action) {
      Object.assign(state, action.payload);
    },
    getFindByIdFailure(state, action) {
      state.success = false;
      state.data = action.payload.error;
    },
    reset(state, action) {
      Object.assign(state, responseForm);
    },
  },
});

export const minPointFindByIdActions = minPointFindById.actions;

export default minPointFindById;
