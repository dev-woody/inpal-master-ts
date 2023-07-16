import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as goodAPI from "api/goods";

//* saga
function* getSearchByKeywordSaga(action: {
  payload: { keyword: string; isDesc: boolean };
}) {
  try {
    const response: AxiosResponse = yield call(
      goodAPI.searchByKeyword,
      action.payload.keyword,
      action.payload.isDesc
    );
    yield put(goodsSearchByKeywordActions.getSearchByKeywordSuccess(response));
  } catch (error) {
    yield put(goodsSearchByKeywordActions.getSearchByKeywordFailure(error));
  }
}

export function* goodsSearchByKeywordSaga() {
  yield takeLatest(
    goodsSearchByKeywordActions.getSearchByKeyword,
    getSearchByKeywordSaga
  );
}

//* reducer
const goodsSearchByKeyword = createSlice({
  name: "goodsSearchByKeyword",
  initialState: responseForm,
  reducers: {
    getSearchByKeyword(state, action) {
      state.message = responseForm.message;
    },
    getSearchByKeywordSuccess(state, action) {
      Object.assign(state, action.payload);
    },
    getSearchByKeywordFailure(state, action) {
      state.success = false;
      state.data = action.payload.error;
    },
    reset(state, action) {
      Object.assign(state, responseForm);
    },
  },
});

export const goodsSearchByKeywordActions = goodsSearchByKeyword.actions;

export default goodsSearchByKeyword;
