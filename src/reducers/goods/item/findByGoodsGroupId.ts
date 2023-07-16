import { createSlice } from "@reduxjs/toolkit";
import { responseForm } from "types/globalTypes";

import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as goodAPI from "api/goods";

//* saga
function* getFindByGroupIdSaga(action: {
  payload: { goodsGroupId: string; isDesc: string };
}) {
  try {
    const response: AxiosResponse = yield call(
      goodAPI.itemFindBygoodsGroupId,
      action.payload.goodsGroupId,
      action.payload.isDesc
    );
    yield put(itemFindByGroupIdActions.getFindByGroupIdSuccess(response));
  } catch (error) {
    yield put(itemFindByGroupIdActions.getFindByGroupIdFailure(error));
  }
}

export function* itemFindByGroupIdSaga() {
  yield takeLatest(
    itemFindByGroupIdActions.getFindByGroupId,
    getFindByGroupIdSaga
  );
}

//* reducer
const itemFindByGroupId = createSlice({
  name: "itemFindByGroupId",
  initialState: responseForm,
  reducers: {
    getFindByGroupId(state, action) {
      state.message = responseForm.message;
    },
    getFindByGroupIdSuccess(state, action) {
      Object.assign(state, action.payload);
    },
    getFindByGroupIdFailure(state, action) {
      state.success = false;
      state.data = action.payload.error;
    },
    reset(state, action) {
      Object.assign(state, responseForm);
    },
  },
});

export const itemFindByGroupIdActions = itemFindByGroupId.actions;

export default itemFindByGroupId;
