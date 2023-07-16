import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as minPointAPI from "api/minPoint";

//* saga
function* getFindByVIdSaga(action: { payload: { data: object } }) {
  try {
    const response: AxiosResponse = yield call(
      minPointAPI.findAllByVId,
      action.payload.data
    );
    yield put(minPointFindByVIdActions.getFindByVIdSuccess(response));
  } catch (error) {
    yield put(minPointFindByVIdActions.getFindByVIdFailure(error));
  }
}

export function* minPointFindByVIdSaga() {
  yield takeLatest(minPointFindByVIdActions.getFindByVId, getFindByVIdSaga);
}

//* reducer
const minPointFindByVId = createSlice({
  name: "minPointFindByVId",
  initialState: responseForm,
  reducers: {
    getFindByVId(state, action) {
      state.message = responseForm.message;
    },
    getFindByVIdSuccess(state, action) {
      Object.assign(state, action.payload);
    },
    getFindByVIdFailure(state, action) {
      state.success = false;
      state.data = action.payload.error;
    },
    reset(state, action) {
      Object.assign(state, responseForm);
    },
  },
});

export const minPointFindByVIdActions = minPointFindByVId.actions;

export default minPointFindByVId;
