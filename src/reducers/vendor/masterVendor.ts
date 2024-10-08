import { createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";
import * as vendorAPI from "api/vendor";
import createRequestSaga from "reducers/createRequestSaga";
import createAsyncReducers, {
  DataForm,
  ResponseData,
  createSingleReducers,
} from "reducers/createAsyncReducers";

const initialState: ResponseData = {
  approve: {},
  setBizStatus: {},
  findAll: {},
  findById: {},
  findByName: {},
  findAllByVendorId: {},
  countVendor: {},
  pageVendor: {},

  pnList: {},
  pnFindById: {},
  pnRegister: {},
  pnUpdate: {},
  setPnOpenStatus: {},

  orderLog: {},
  orderFindById: {},
  orderItemFindByVendorId: {},
  setOrderStatus: {},
  countOrder: {},
  pageOrder: {},
  countOrderVendorId: {},
  pageOrderVendorId: {},
};

export function* masterVendorSaga() {
  yield takeLatest(
    masterVendorActions.approve,
    createRequestSaga("masterVendor/aprove", vendorAPI.approve)
  );
  yield takeLatest(
    masterVendorActions.setBizStatus,
    createRequestSaga("masterVendor/setBizStatus", vendorAPI.setBizStatus)
  );
  yield takeLatest(
    masterVendorActions.findAll,
    createRequestSaga("masterVendor/findAll", vendorAPI.findAll)
  );
  yield takeLatest(
    masterVendorActions.findById,
    createRequestSaga("masterVendor/findById", vendorAPI.findById)
  );
  yield takeLatest(
    masterVendorActions.findByName,
    createRequestSaga("masterVendor/findByName", vendorAPI.findByName)
  );
  yield takeLatest(
    masterVendorActions.findAllByVendorId,
    createRequestSaga(
      "masterVendor/findAllByVendorId",
      vendorAPI.findAllByVendorId
    )
  );
  yield takeLatest(
    masterVendorActions.countVendor,
    createRequestSaga("masterVendor/countVendor", vendorAPI.countVendor)
  );
  yield takeLatest(
    masterVendorActions.pageVendor,
    createRequestSaga("masterVendor/pageVendor", vendorAPI.pageVendor)
  );
  yield takeLatest(
    masterVendorActions.pnList,
    createRequestSaga("masterVendor/pnList", vendorAPI.pnFindByVendorId)
  );
  yield takeLatest(
    masterVendorActions.pnFindById,
    createRequestSaga("masterVendor/pnFindById", vendorAPI.pnFindById)
  );
  yield takeLatest(
    masterVendorActions.pnRegister,
    createRequestSaga("masterVendor/pnRegister", vendorAPI.pnRegister)
  );
  yield takeLatest(
    masterVendorActions.pnUpdate,
    createRequestSaga("masterVendor/pnUpdate", vendorAPI.pnUpdate)
  );
  yield takeLatest(
    masterVendorActions.setPnOpenStatus,
    createRequestSaga("masterVendor/setPnOpenStatus", vendorAPI.setPnOpenStatus)
  );
  yield takeLatest(
    masterVendorActions.orderLog,
    createRequestSaga("masterVendor/orderLog", vendorAPI.orderLogFindByItemId)
  );
  yield takeLatest(
    masterVendorActions.orderFindById,
    createRequestSaga("masterVendor/orderFindById", vendorAPI.orderFindById)
  );
  yield takeLatest(
    masterVendorActions.orderItemFindByVendorId,
    createRequestSaga(
      "masterVendor/orderItemFindByVendorId",
      vendorAPI.orderItemFindByVendorId
    )
  );
  yield takeLatest(
    masterVendorActions.setOrderStatus,
    createRequestSaga("masterVendor/setOrderStatus", vendorAPI.setOrderStatus)
  );
  yield takeLatest(
    masterVendorActions.countOrder,
    createRequestSaga("masterVendor/countOrder", vendorAPI.countOrder)
  );
  yield takeLatest(
    masterVendorActions.pageOrder,
    createRequestSaga("masterVendor/pageOrder", vendorAPI.pageOrder)
  );
  yield takeLatest(
    masterVendorActions.countOrderVendorId,
    createRequestSaga(
      "masterVendor/countOrderVendorId",
      vendorAPI.countOrderVendorId
    )
  );
  yield takeLatest(
    masterVendorActions.pageOrderVendorId,
    createRequestSaga(
      "masterVendor/pageOrderVendorId",
      vendorAPI.pageOrderVendorId
    )
  );
}

//* reducer
const masterVendor = createSlice({
  name: "masterVendor",
  initialState,
  reducers: {
    ...createAsyncReducers({
      actionName: "approve",
      reducerName: "approve",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "setBizStatus",
      reducerName: "setBizStatus",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "findAll",
      reducerName: "findAll",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "findByName",
      reducerName: "findByName",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "findById",
      reducerName: "findById",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "findAllByVendorId",
      reducerName: "findAllByVendorId",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "countVendor",
      reducerName: "countVendor",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "pageVendor",
      reducerName: "pageVendor",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "pnList",
      reducerName: "pnList",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "pnFindById",
      reducerName: "pnFindById",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "pnRegister",
      reducerName: "pnRegister",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "pnUpdate",
      reducerName: "pnUpdate",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "setPnOpenStatus",
      reducerName: "setPnOpenStatus",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "orderLog",
      reducerName: "orderLog",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "orderFindById",
      reducerName: "orderFindById",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "orderItemFindByVendorId",
      reducerName: "orderItemFindByVendorId",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "setOrderStatus",
      reducerName: "setOrderStatus",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "countOrder",
      reducerName: "countOrder",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "pageOrder",
      reducerName: "pageOrder",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "countOrderVendorId",
      reducerName: "countOrderVendorId",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "pageOrderVendorId",
      reducerName: "pageOrderVendorId",
    })<any, DataForm, string>(),
    ...createSingleReducers({
      actionName: "reset",
    })<any>(),
  },
});

export const masterVendorActions = masterVendor.actions;

export default masterVendor;
