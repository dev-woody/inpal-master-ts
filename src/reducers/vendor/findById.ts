import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as vendorAPI from "api/vendor";

//* saga
function* getFindByIdSaga(action: { payload: { id: string } }) {
  try {
    const response: AxiosResponse = yield call(
      vendorAPI.findById,
      action.payload.id
    );
    yield put(vendorFindByIdActions.getFindByIdSuccess(response));
  } catch (error) {
    yield put(vendorFindByIdActions.getFindByIdFailure(error));
  }
}

export function* vendorFindByIdSaga() {
  yield takeLatest(vendorFindByIdActions.getFindById, getFindByIdSaga);
}

//* reducer
const vendorFindById = createSlice({
  name: "vendorFindById",
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

export const vendorFindByIdActions = vendorFindById.actions;

export default vendorFindById;
