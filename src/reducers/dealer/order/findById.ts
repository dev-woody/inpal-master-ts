import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as dealerAPI from "api/dealer";

//* saga
function* getFindByIdSaga(action: { payload: { id: string } }) {
  try {
    const response: AxiosResponse = yield call(
      dealerAPI.orderFindById,
      action.payload.id
    );
    yield put(dealerOrderFindByIdActions.getFindByIdSuccess(response));
  } catch (error) {
    yield put(dealerOrderFindByIdActions.getFindByIdFailure(error));
  }
}

export function* dealerOrderFindByIdSaga() {
  yield takeLatest(dealerOrderFindByIdActions.getFindById, getFindByIdSaga);
}

//* reducer
const dealerOrderFindById = createSlice({
  name: "dealerOrderFindById",
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

export const dealerOrderFindByIdActions = dealerOrderFindById.actions;

export default dealerOrderFindById;
