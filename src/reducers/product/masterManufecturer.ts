import { createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";
import * as manufacturerAPI from "api/manufacturer";
import createRequestSaga from "reducers/createRequestSaga";
import createAsyncReducers, {
  DataForm,
  ResponseData,
  createSingleReducers,
} from "reducers/createAsyncReducers";

const initialState: ResponseData = {
  register: {},
  setOpenStatus: {},
  basicInfo: {},
  detailPage: {},
  findAll: {},
  findById: {},
  findAllByProductId: {},
};

export function* masterManufacturerSaga() {
  yield takeLatest(
    masterManufacturerActions.register,
    createRequestSaga("masterManufacturer/register", manufacturerAPI.register)
  );
  yield takeLatest(
    masterManufacturerActions.setOpenStatus,
    createRequestSaga(
      "masterManufacturer/setOpenStatus",
      manufacturerAPI.setOpenStatus
    )
  );
  yield takeLatest(
    masterManufacturerActions.basicInfo,
    createRequestSaga("masterManufacturer/basicInfo", manufacturerAPI.basicInfo)
  );
  yield takeLatest(
    masterManufacturerActions.detailPage,
    createRequestSaga(
      "masterManufacturer/detailPage",
      manufacturerAPI.detailPage
    )
  );
  yield takeLatest(
    masterManufacturerActions.findAll,
    createRequestSaga("masterManufacturer/findAll", manufacturerAPI.findAll)
  );
  yield takeLatest(
    masterManufacturerActions.findById,
    createRequestSaga("masterManufacturer/findById", manufacturerAPI.findById)
  );
  yield takeLatest(
    masterManufacturerActions.findAllByProductId,
    createRequestSaga(
      "masterManufacturer/findAllByProductId",
      manufacturerAPI.findAllByProductId
    )
  );
}

//* reducer
const masterManufacturer = createSlice({
  name: "masterManufacturer",
  initialState,
  reducers: {
    ...createAsyncReducers({
      actionName: "register",
      reducerName: "register",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "setOpenStatus",
      reducerName: "setOpenStatus",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "basicInfo",
      reducerName: "basicInfo",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "detailPage",
      reducerName: "detailPage",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "findAll",
      reducerName: "findAll",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "findById",
      reducerName: "findById",
    })<any, DataForm, string>(),
    ...createAsyncReducers({
      actionName: "findAllByProductId",
      reducerName: "findAllByProductId",
    })<any, DataForm, string>(),
    ...createSingleReducers({
      actionName: "reset",
    })<any>(),
  },
});

export const masterManufacturerActions = masterManufacturer.actions;

export default masterManufacturer;
