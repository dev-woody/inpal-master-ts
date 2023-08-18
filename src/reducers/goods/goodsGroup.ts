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
    ...createSingleReducers({
      actionName: "reset",
    })<any>(),
  },
});

export const masterGoodsGroupActions = masterGoodsGroup.actions;

export default masterGoodsGroup;
