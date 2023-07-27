import { createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";
import * as goodsAPI from "api/goods";
import createRequestSaga from "reducers/createRequestSaga";
import createAsyncReducers, {
  DataForm,
  ResponseData,
  createSingleReducers,
} from "reducers/createAsyncReducers";

const initialState: ResponseData = {
  findAll: {},
  findById: {},
};

export function* masterGoodsGroupSaga() {
  yield takeLatest(
    masterGoodsGroupActions.findAll,
    createRequestSaga("masterGoodsGroup/findAll", goodsAPI.goodsGroupFindAll)
  );
  yield takeLatest(
    masterGoodsGroupActions.findById,
    createRequestSaga("masterGoodsGroup/findById", goodsAPI.findById)
  );
}

//* reducer
const masterGoodsGroup = createSlice({
  name: "masterGoodsGroup",
  initialState,
  reducers: {
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

export const masterGoodsGroupActions = masterGoodsGroup.actions;

export default masterGoodsGroup;
