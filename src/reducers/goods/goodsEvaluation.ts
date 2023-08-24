import { createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";
import * as goodsEvaluationAPI from "api/evaluation";
import createRequestSaga from "reducers/createRequestSaga";
import createAsyncReducers, {
  DataForm,
  ResponseData,
  createSingleReducers,
} from "reducers/createAsyncReducers";

const initialState: ResponseData = {
  findById: {},
  findByGoodItemId: {},
  countReview: {},
  pageReview: {},
  setOpenStatus: {},
};

export function* masterGoodsEvaluationSaga() {
  yield takeLatest(
    masterGoodsEvaluationActions.findById,
    createRequestSaga(
      "masterGoodsEvaluation/findById",
      goodsEvaluationAPI.findById
    )
  );
  yield takeLatest(
    masterGoodsEvaluationActions.findByGoodItemId,
    createRequestSaga(
      "masterGoodsEvaluation/findByGoodItemId",
      goodsEvaluationAPI.findByGoodItemId
    )
  );
  yield takeLatest(
    masterGoodsEvaluationActions.countReview,
    createRequestSaga(
      "masterGoodsEvaluation/countReview",
      goodsEvaluationAPI.countReview
    )
  );
  yield takeLatest(
    masterGoodsEvaluationActions.pageReview,
    createRequestSaga(
      "masterGoodsEvaluation/pageReview",
      goodsEvaluationAPI.pageReview
    )
  );
  yield takeLatest(
    masterGoodsEvaluationActions.setOpenStatus,
    createRequestSaga(
      "masterGoodsEvaluation/setOpenStatus",
      goodsEvaluationAPI.setOpenStatus
    )
  );
}

//* reducer
const masterGoodsEvaluation = createSlice({
  name: "masterGoodsEvaluation",
  initialState,
  reducers: {
    ...createAsyncReducers({
      actionName: "findById",
      reducerName: "findById",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "findByGoodItemId",
      reducerName: "findByGoodItemId",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "countReview",
      reducerName: "countReview",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "pageReview",
      reducerName: "pageReview",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "setOpenStatus",
      reducerName: "setOpenStatus",
    })<any, DataForm, string>(),
    ...createSingleReducers({
      actionName: "reset",
    })<any>(),
  },
});

export const masterGoodsEvaluationActions = masterGoodsEvaluation.actions;

export default masterGoodsEvaluation;
