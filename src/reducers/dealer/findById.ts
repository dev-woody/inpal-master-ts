import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as dealerAPI from "api/dealer";

//* saga
function* getFindByIdSaga(action: { payload: { id: string } }) {
  try {
    const response: AxiosResponse = yield call(
      dealerAPI.findById,
      action.payload.id
    );
    yield put(dealerFindByIdActions.getFindByIdSuccess(response));
  } catch (error) {
    yield put(dealerFindByIdActions.getFindByIdFailure(error));
  }
}

export function* dealerFindByIdSaga() {
  yield takeLatest(dealerFindByIdActions.getFindById, getFindByIdSaga);
}

//* reducer
const dealerFindById = createSlice({
  name: "dealerFindById",
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

export const dealerFindByIdActions = dealerFindById.actions;

export default dealerFindById;
