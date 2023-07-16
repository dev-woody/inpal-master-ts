import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as vendorAPI from "api/vendor";

//* saga
function* getFindByIdSaga(action: { payload: { id: string } }) {
  try {
    const response: AxiosResponse = yield call(
      vendorAPI.orderFindById,
      action.payload.id
    );
    yield put(vendorOrderFindByIdActions.getFindByIdSuccess(response));
  } catch (error) {
    yield put(vendorOrderFindByIdActions.getFindByIdFailure(error));
  }
}

export function* vendorOrderFindByIdSaga() {
  yield takeLatest(vendorOrderFindByIdActions.getFindById, getFindByIdSaga);
}

//* reducer
const vendorOrderFindById = createSlice({
  name: "vendorOrderFindById",
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

export const vendorOrderFindByIdActions = vendorOrderFindById.actions;

export default vendorOrderFindById;
