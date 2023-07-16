import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as dealerAPI from "api/dealer";

//* saga
function* getFindByDealerIdSaga(action: {
  payload: { dealerId: string; isDesc: boolean };
}) {
  try {
    const response: AxiosResponse = yield call(
      dealerAPI.orderFindByDealerId,
      action.payload.dealerId,
      action.payload.isDesc
    );
    yield put(orderFindByDealerIdActions.getFindByDealerIdSuccess(response));
  } catch (error) {
    yield put(orderFindByDealerIdActions.getFindByDealerIdFailure(error));
  }
}

export function* orderFindByDealerIdSaga() {
  yield takeLatest(
    orderFindByDealerIdActions.getFindByDealerId,
    getFindByDealerIdSaga
  );
}

//* reducer
const orderFindByDealerId = createSlice({
  name: "orderFindByDealerId",
  initialState: responseForm,
  reducers: {
    getFindByDealerId(state, action) {
      state.message = responseForm.message;
    },
    getFindByDealerIdSuccess(state, action) {
      Object.assign(state, action.payload);
    },
    getFindByDealerIdFailure(state, action) {
      state.success = false;
      state.data = action.payload.error;
    },
    reset(state, action) {
      Object.assign(state, responseForm);
    },
  },
});

export const orderFindByDealerIdActions = orderFindByDealerId.actions;

export default orderFindByDealerId;
