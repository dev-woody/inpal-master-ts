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
  countGoodsItem: {},
  pageGoodsItem: {},
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
  yield takeLatest(
    masterGoodsItemActions.countGoodsItem,
    createRequestSaga("masterGoodsItem/countGoodsItem", goodsAPI.countGoodsItem)
  );
  yield takeLatest(
    masterGoodsItemActions.pageGoodsItem,
    createRequestSaga("masterGoodsItem/pageGoodsItem", goodsAPI.pageGoodsItem)
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
    ...createAsyncReducers({
      actionName: "countGoodsItem",
      reducerName: "countGoodsItem",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "pageGoodsItem",
      reducerName: "pageGoodsItem",
    })<any, DataForm, string>(),
    ...createSingleReducers({
      actionName: "reset",
    })<any>(),
  },
});

export const masterGoodsItemActions = masterGoodsItem.actions;

export default masterGoodsItem;
