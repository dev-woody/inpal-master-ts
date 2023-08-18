import { createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";
import * as colorAPI from "api/color";
import createRequestSaga from "reducers/createRequestSaga";
import createAsyncReducers, {
  DataForm,
  ResponseData,
  createSingleReducers,
} from "reducers/createAsyncReducers";

const initialState: ResponseData = {
  register: {},
  findAll: {},
  findByName: {},
  update: {},
  countColor: {},
  pageColor: {},
};

export function* masterColorSaga() {
  yield takeLatest(
    masterColorActions.register,
    createRequestSaga("masterColor/register", colorAPI.colorRegister)
  );
  yield takeLatest(
    masterColorActions.findAll,
    createRequestSaga("masterColor/findAll", colorAPI.colorFindAll)
  );
  yield takeLatest(
    masterColorActions.findByName,
    createRequestSaga("masterColor/findByName", colorAPI.colorFindByName)
  );
  yield takeLatest(
    masterColorActions.update,
    createRequestSaga("masterColor/update", colorAPI.colorUpdate)
  );
  yield takeLatest(
    masterColorActions.countColor,
    createRequestSaga("masterColor/countColor", colorAPI.countColor)
  );
  yield takeLatest(
    masterColorActions.pageColor,
    createRequestSaga("masterColor/pageColor", colorAPI.pageColor)
  );
}

//* reducer
const masterColor = createSlice({
  name: "masterColor",
  initialState,
  reducers: {
    ...createAsyncReducers({
      actionName: "register",
      reducerName: "register",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "findAll",
      reducerName: "findAll",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "findByName",
      reducerName: "findByName",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "update",
      reducerName: "update",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "countColor",
      reducerName: "countColor",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "pageColor",
      reducerName: "pageColor",
    })<any, DataForm, string>(),
    ...createSingleReducers({
      actionName: "reset",
    })<any>(),
  },
});

export const masterColorActions = masterColor.actions;

export default masterColor;
