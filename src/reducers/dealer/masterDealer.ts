import { createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";
import * as dealerAPI from "api/dealer";
import createRequestSaga from "reducers/createRequestSaga";
import createAsyncReducers, {
  DataForm,
  ResponseData,
  createSingleReducers,
} from "reducers/createAsyncReducers";

const initialState: ResponseData = {
  approve: {},
  setBizStatus: {},
  findAll: {},
  findById: {},
};

export function* masterDealerSaga() {
  yield takeLatest(
    masterDealerActions.approve,
    createRequestSaga("masterDealer/approve", dealerAPI.approve)
  );
  yield takeLatest(
    masterDealerActions.setBizStatus,
    createRequestSaga("masterDealer/setBizStatus", dealerAPI.setBizStatus)
  );
  yield takeLatest(
    masterDealerActions.findAll,
    createRequestSaga("masterDealer/findAll", dealerAPI.findAll)
  );
  yield takeLatest(
    masterDealerActions.findById,
    createRequestSaga("masterDealer/findById", dealerAPI.findById)
  );
}

//* reducer
const masterDealer = createSlice({
  name: "masterDealer",
  initialState,
  reducers: {
    ...createAsyncReducers({
      actionName: "approve",
      reducerName: "approve",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "setBizStatus",
      reducerName: "setBizStatus",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "findAll",
      reducerName: "findAll",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "findById",
      reducerName: "findById",
    })<any, DataForm, string>(),
    ...createSingleReducers({
      actionName: "reset",
    })<any>(),
  },
});

export const masterDealerActions = masterDealer.actions;

export default masterDealer;
