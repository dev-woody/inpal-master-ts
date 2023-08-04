import { createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";
import * as termsAPI from "api/terms";
import createRequestSaga from "reducers/createRequestSaga";
import createAsyncReducers, {
  DataForm,
  ResponseData,
  createSingleReducers,
} from "reducers/createAsyncReducers";

const initialState: ResponseData = {
  register: {},
  update: {},
  setOpenStatus: {},
  findAll: {},
  findById: {},
};

export function* masterTermsSaga() {
  yield takeLatest(
    masterTermsActions.register,
    createRequestSaga("masterTerms/register", termsAPI.register)
  );
  yield takeLatest(
    masterTermsActions.update,
    createRequestSaga("masterTerms/update", termsAPI.update)
  );
  yield takeLatest(
    masterTermsActions.setOpenStatus,
    createRequestSaga("masterTerms/setOpenStatus", termsAPI.setOpenStatus)
  );
  yield takeLatest(
    masterTermsActions.findAll,
    createRequestSaga("masterTerms/findAll", termsAPI.findAll)
  );
  yield takeLatest(
    masterTermsActions.findById,
    createRequestSaga("masterTerms/findById", termsAPI.findById)
  );
}

//* reducer
const masterTerms = createSlice({
  name: "masterTerms",
  initialState,
  reducers: {
    ...createAsyncReducers({
      actionName: "register",
      reducerName: "register",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "update",
      reducerName: "update",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "setOpenStatus",
      reducerName: "setOpenStatus",
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

export const masterTermsActions = masterTerms.actions;

export default masterTerms;
