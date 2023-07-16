import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as sellChargeAPI from "api/sellCharge";

//* saga
function* getFindByVIdSaga(action: { payload: { data: object } }) {
  try {
    const response: AxiosResponse = yield call(
      sellChargeAPI.findAllByVId,
      action.payload.data
    );
    yield put(sellChargeFindByVIdActions.getFindByVIdSuccess(response));
  } catch (error) {
    yield put(sellChargeFindByVIdActions.getFindByVIdFailure(error));
  }
}

export function* sellChargeFindByVIdSaga() {
  yield takeLatest(sellChargeFindByVIdActions.getFindByVId, getFindByVIdSaga);
}

//* reducer
const sellChargeFindByVId = createSlice({
  name: "sellChargeFindByVId",
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

export const sellChargeFindByVIdActions = sellChargeFindByVId.actions;

export default sellChargeFindByVId;
