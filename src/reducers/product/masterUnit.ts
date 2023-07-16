import { createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";
import * as unitAPI from "api/unit";
import createRequestSaga from "reducers/createRequestSaga";
import createAsyncReducers, {
  DataForm,
  ResponseData,
  createSingleReducers,
} from "reducers/createAsyncReducers";

const initialState: ResponseData = {
  register: {},
  update: {},
  findById: {},
  findAllByProductId: {},
};

export function* masterUnitSaga() {
  yield takeLatest(
    masterUnitActions.register,
    createRequestSaga("masterUnit/register", unitAPI.register)
  );
  yield takeLatest(
    masterUnitActions.update,
    createRequestSaga("masterUnit/update", unitAPI.update)
  );
  yield takeLatest(
    masterUnitActions.findById,
    createRequestSaga("masterUnit/findById", unitAPI.findById)
  );
  yield takeLatest(
    masterUnitActions.findAllByProductId,
    createRequestSaga(
      "masterUnit/findAllByProductId",
      unitAPI.findAllByProductId
    )
  );
}

//* reducer
const masterUnit = createSlice({
  name: "masterUnit",
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
      actionName: "findById",
      reducerName: "findById",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "findAllByProductId",
      reducerName: "findAllByProductId",
    })<any, DataForm, string>(),
    ...createSingleReducers({
      actionName: "reset",
    })<any>(),
  },
});

export const masterUnitActions = masterUnit.actions;

export default masterUnit;
