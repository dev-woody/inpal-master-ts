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
  findById: {},
  findByGoodsGroupId: {},
};

export function* masterGoodsItemSaga() {
  yield takeLatest(
    masterGoodsItemActions.findById,
    createRequestSaga("masterGoodsItem/findById", goodsAPI.itemFindById)
  );
  yield takeLatest(
    masterGoodsItemActions.findByGoodsGroupId,
    createRequestSaga(
      "masterGoodsItem/findByGoodsGroupId",
      goodsAPI.itemFindBygoodsGroupId
    )
  );
}

//* reducer
const masterGoodsItem = createSlice({
  name: "masterGoodsItem",
  initialState,
  reducers: {
    ...createAsyncReducers({
      actionName: "findById",
      reducerName: "findById",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "findByGoodsGroupId",
      reducerName: "findByGoodsGroupId",
    })<any, DataForm, string>(),
    ...createSingleReducers({
      actionName: "reset",
    })<any>(),
  },
});

export const masterGoodsItemActions = masterGoodsItem.actions;

export default masterGoodsItem;
