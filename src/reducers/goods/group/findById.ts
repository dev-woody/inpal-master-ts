import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as goodAPI from "api/goods";

//* saga
function* getFindByIdSaga(action: { payload: { id: string } }) {
  try {
    const response: AxiosResponse = yield call(
      goodAPI.findById,
      action.payload.id
    );
    yield put(goodFindByIdActions.getFindByIdSuccess(response));
  } catch (error) {
    yield put(goodFindByIdActions.getFindByIdFailure(error));
  }
}

export function* goodFindByIdSaga() {
  yield takeLatest(goodFindByIdActions.getFindById, getFindByIdSaga);
}

//* reducer
const goodFindById = createSlice({
  name: "goodFindById",
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

export const goodFindByIdActions = goodFindById.actions;

export default goodFindById;
