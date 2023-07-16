import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as dealerAPI from "api/dealer";

//* saga
function* getFindAllSaga(action: { payload: { reverse: boolean } }) {
  try {
    const response: AxiosResponse = yield call(
      dealerAPI.findAll,
      action.payload.reverse
    );
    yield put(dealerFindAllActions.getFindAllSuccess(response));
  } catch (error) {
    yield put(dealerFindAllActions.getFindAllFailure(error));
  }
}

export function* dealerFindAllSaga() {
  yield takeLatest(dealerFindAllActions.getFindAll, getFindAllSaga);
}

//* reducer
const dealerFindAll = createSlice({
  name: "dealerFindAll",
  initialState: responseForm,
  reducers: {
    getFindAll(state, action) {
      state.message = responseForm.message;
    },
    getFindAllSuccess(state, action) {
      Object.assign(state, action.payload);
    },
    getFindAllFailure(state, action) {
      state.success = false;
      state.data = action.payload.error;
    },
    reset(state, action) {
      Object.assign(state, responseForm);
    },
  },
});

export const dealerFindAllActions = dealerFindAll.actions;

export default dealerFindAll;
