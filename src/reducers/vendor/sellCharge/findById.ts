import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as sellChargeAPI from "api/sellCharge";

//* saga
function* getFindByIdSaga(action: { payload: { data: object } }) {
  try {
    const response: AxiosResponse = yield call(
      sellChargeAPI.findById,
      action.payload.data
    );
    yield put(sellChargeFindByIdActions.getFindByIdSuccess(response));
  } catch (error) {
    yield put(sellChargeFindByIdActions.getFindByIdFailure(error));
  }
}

export function* sellChargeFindByIdSaga() {
  yield takeLatest(sellChargeFindByIdActions.getFindById, getFindByIdSaga);
}

//* reducer
const sellChargeFindById = createSlice({
  name: "sellChargeFindById",
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

export const sellChargeFindByIdActions = sellChargeFindById.actions;

export default sellChargeFindById;
