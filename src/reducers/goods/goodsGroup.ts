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
  countGoodsGroup: {},
  pageGoodsGroup: {},
  countGroupProduct: {},
  pageGroupProduct: {},
  countGoodsGroupVendor: {},
  pageGoodsGroupVendor: {},
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
  yield takeLatest(
    masterGoodsGroupActions.countGoodsGroup,
    createRequestSaga(
      "masterGoodsGroup/countGoodsGroup",
      goodsAPI.countGoodsGroup
    )
  );
  yield takeLatest(
    masterGoodsGroupActions.pageGoodsGroup,
    createRequestSaga(
      "masterGoodsGroup/pageGoodsGroup",
      goodsAPI.pageGoodsGroup
    )
  );
  yield takeLatest(
    masterGoodsGroupActions.countGroupProduct,
    createRequestSaga(
      "masterGoodsGroup/countGroupProduct",
      goodsAPI.countGroupProduct
    )
  );
  yield takeLatest(
    masterGoodsGroupActions.pageGroupProduct,
    createRequestSaga(
      "masterGoodsGroup/pageGroupProduct",
      goodsAPI.pageGroupProduct
    )
  );
  yield takeLatest(
    masterGoodsGroupActions.countGoodsGroupVendor,
    createRequestSaga(
      "masterGoodsGroup/countGoodsGroupVendor",
      goodsAPI.countGoodsGroupVendor
    )
  );
  yield takeLatest(
    masterGoodsGroupActions.pageGoodsGroupVendor,
    createRequestSaga(
      "masterGoodsGroup/pageGoodsGroupVendor",
      goodsAPI.pageGoodsGroupVendor
    )
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
    ...createAsyncReducers({
      actionName: "countGoodsGroup",
      reducerName: "countGoodsGroup",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "pageGoodsGroup",
      reducerName: "pageGoodsGroup",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "countGroupProduct",
      reducerName: "countGroupProduct",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "pageGroupProduct",
      reducerName: "pageGroupProduct",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "countGoodsGroupVendor",
      reducerName: "countGoodsGroupVendor",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "pageGoodsGroupVendor",
      reducerName: "pageGoodsGroupVendor",
    })<any, DataForm, string>(),
    ...createSingleReducers({
      actionName: "reset",
    })<any>(),
  },
});

export const masterGoodsGroupActions = masterGoodsGroup.actions;

export default masterGoodsGroup;
