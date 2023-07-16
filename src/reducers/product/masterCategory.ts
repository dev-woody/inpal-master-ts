import { createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";
import * as categoryAPI from "api/category";
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
  findAllByOwnerId: {},
};

export function* masterCategorySaga() {
  yield takeLatest(
    masterCategoryActions.register,
    createRequestSaga("masterCategory/register", categoryAPI.register)
  );
  yield takeLatest(
    masterCategoryActions.update,
    createRequestSaga("masterCategory/update", categoryAPI.update)
  );
  yield takeLatest(
    masterCategoryActions.findById,
    createRequestSaga("masterCategory/findById", categoryAPI.findById)
  );
  yield takeLatest(
    masterCategoryActions.findAllByProductId,
    createRequestSaga(
      "masterCategory/findAllByProductId",
      categoryAPI.findAllByProductId
    )
  );
  yield takeLatest(
    masterCategoryActions.findAllByOwnerId,
    createRequestSaga(
      "masterCategory/findAllByOwnerId",
      categoryAPI.findAllByOwnerId
    )
  );
}

//* reducer
const masterCategory = createSlice({
  name: "masterCategory",
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
    ...createAsyncReducers({
      actionName: "findAllByOwnerId",
      reducerName: "findAllByOwnerId",
    })<any, DataForm, string>(),
    ...createSingleReducers({
      actionName: "reset",
    })<any>(),
  },
});

export const masterCategoryActions = masterCategory.actions;

export default masterCategory;
