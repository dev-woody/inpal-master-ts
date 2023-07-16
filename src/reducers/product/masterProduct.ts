import { createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";
import * as productAPI from "api/product";
import createRequestSaga from "reducers/createRequestSaga";
import createAsyncReducers, {
  DataForm,
  ResponseData,
  createSingleReducers,
} from "reducers/createAsyncReducers";

const initialState: ResponseData = {
  register: {},
  findAll: {},
  findById: {},
  update: {},
};

export function* masterProductSaga() {
  yield takeLatest(
    masterProductActions.register,
    createRequestSaga("masterProduct/register", productAPI.register)
  );
  yield takeLatest(
    masterProductActions.findAll,
    createRequestSaga("masterProduct/findAll", productAPI.findAll)
  );
  yield takeLatest(
    masterProductActions.findById,
    createRequestSaga("masterProduct/findById", productAPI.findById)
  );
  yield takeLatest(
    masterProductActions.update,
    createRequestSaga("masterProduct/update", productAPI.update)
  );
}

//* reducer
const masterProduct = createSlice({
  name: "masterProduct",
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
      actionName: "findById",
      reducerName: "findById",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "update",
      reducerName: "update",
    })<any, DataForm, string>(),
    ...createSingleReducers({
      actionName: "reset",
    })<any>(),
  },
});

export const masterProductActions = masterProduct.actions;

export default masterProduct;
