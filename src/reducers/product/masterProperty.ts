import { createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";
import * as propertyAPI from "api/property";
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

export function* masterPropertySaga() {
  yield takeLatest(
    masterPropertyActions.register,
    createRequestSaga("masterProperty/register", propertyAPI.register)
  );
  yield takeLatest(
    masterPropertyActions.update,
    createRequestSaga("masterProperty/update", propertyAPI.update)
  );
  yield takeLatest(
    masterPropertyActions.findById,
    createRequestSaga("masterProperty/findById", propertyAPI.findById)
  );
  yield takeLatest(
    masterPropertyActions.findAllByProductId,
    createRequestSaga(
      "masterProperty/findAllByProductId",
      propertyAPI.findAllByProductId
    )
  );
}

//* reducer
const masterProperty = createSlice({
  name: "masterProperty",
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

export const masterPropertyActions = masterProperty.actions;

export default masterProperty;
