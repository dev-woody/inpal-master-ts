import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all, fork } from "redux-saga/effects";
import user from "./user";
import { loadingSlice } from "./loading";

import masterAdmin, { masterAdminSaga } from "./admin/masterAdmin";
import masterVendor, { masterVendorSaga } from "./vendor/masterVendor";
import masterColor, { masterColorSaga } from "./admin/masterColor";
import masterCupon, { masterCuponSaga } from "./admin/masterCupon";
import masterProduct, { masterProductSaga } from "./product/masterProduct";
import masterManufacturer, {
  masterManufacturerSaga,
} from "./product/masterManufecturer";
import masterCategory, { masterCategorySaga } from "./product/masterCategory";
import masterUnit, { masterUnitSaga } from "./product/masterUnit";
import masterProperty, { masterPropertySaga } from "./product/masterProperty";
import masterGoodsGroup, { masterGoodsGroupSaga } from "./goods/goodsGroup";
import masterGoodsItem, { masterGoodsItemSaga } from "./goods/goodsItem";

//* vendor
import vendorOrderFindAll, {
  vendorOrderFindAllSaga,
} from "./vendor/order/findAll";
import paymentFindById, {
  paymentFindByIdSaga,
} from "./vendor/payment/findById";
import orderFindByVendorId, {
  orderFindByVendorIdSaga,
} from "./vendor/order/findByVendorId";
import vendorOrderFindById, {
  vendorOrderFindByIdSaga,
} from "./vendor/order/findById";

//* sellCharge
import sellChargeFindByVId, {
  sellChargeFindByVIdSaga,
} from "./vendor/sellCharge/findByVId";
import sellChargeFindById, {
  sellChargeFindByIdSaga,
} from "./vendor/sellCharge/findById";
import sellChargeRegister, {
  sellChargeRegisterSaga,
} from "./vendor/sellCharge/register";
import sellChargeUpdate, {
  sellChargeUpdateSaga,
} from "./vendor/sellCharge/update";

//* minPoint
import minPointFindById, {
  minPointFindByIdSaga,
} from "./vendor/minPoint/findById";
import minPointFindByVId, {
  minPointFindByVIdSaga,
} from "./vendor/minPoint/findByVId";
import minPointRegister, {
  minPointRegisterSaga,
} from "./vendor/minPoint/register";
import minPointUpdate, { minPointUpdateSaga } from "./vendor/minPoint/update";

//* dealer
import dealerFindAll, { dealerFindAllSaga } from "./dealer/findAll";
import dealerOrderFindAll, {
  dealerOrderFindAllSaga,
} from "./dealer/order/findAll";
import setDealerStatus, { setDealerStatusSaga } from "./dealer/setStatus";
import dealerRegister, { dealerRegisterSaga } from "./dealer/register";
import dealerFindById, { dealerFindByIdSaga } from "./dealer/findById";
import orderFindByDealerId, {
  orderFindByDealerIdSaga,
} from "./dealer/order/findByDealerId";
import dealerOrderFindById, {
  dealerOrderFindByIdSaga,
} from "./dealer/order/findById";

//*  goods
import optionSetSellStatus, {
  optionSetSellStatusSaga,
} from "./goods/option/setSellStatus";

// * saga
const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([
    fork(masterAdminSaga),
    fork(masterVendorSaga),
    fork(masterColorSaga),
    fork(masterCuponSaga),
    fork(masterProductSaga),
    fork(masterManufacturerSaga),
    fork(masterCategorySaga),
    fork(masterUnitSaga),
    fork(masterPropertySaga),
    fork(masterGoodsGroupSaga),
    fork(masterGoodsItemSaga),
    //* vendor
    fork(vendorOrderFindAllSaga),
    fork(paymentFindByIdSaga),
    fork(orderFindByVendorIdSaga),
    fork(vendorOrderFindByIdSaga),
    //* sellCharge
    fork(sellChargeFindByVIdSaga),
    fork(sellChargeFindByIdSaga),
    fork(sellChargeRegisterSaga),
    fork(sellChargeUpdateSaga),
    //* minPoint
    fork(minPointFindByIdSaga),
    fork(minPointFindByVIdSaga),
    fork(minPointRegisterSaga),
    fork(minPointUpdateSaga),
    //* dealer
    fork(dealerFindAllSaga),
    fork(dealerOrderFindAllSaga),
    fork(setDealerStatusSaga),
    fork(dealerRegisterSaga),
    fork(dealerFindByIdSaga),
    fork(orderFindByDealerIdSaga),
    fork(dealerOrderFindByIdSaga),
    //* goods
    fork(optionSetSellStatusSaga),
  ]);
}

//* reducer
const rootReducer = combineReducers({
  user: user.reducer,
  loading: loadingSlice.reducer,
  masterAdmin: masterAdmin.reducer,
  masterVendor: masterVendor.reducer,
  masterColor: masterColor.reducer,
  masterCupon: masterCupon.reducer,
  masterProduct: masterProduct.reducer,
  masterManufacturer: masterManufacturer.reducer,
  masterCategory: masterCategory.reducer,
  masterUnit: masterUnit.reducer,
  masterProperty: masterProperty.reducer,
  masterGoodsGroup: masterGoodsGroup.reducer,
  masterGoodsItem: masterGoodsItem.reducer,
  //* vendor
  vendorOrderFindAll: vendorOrderFindAll.reducer,
  paymentFindById: paymentFindById.reducer,
  orderFindByVendorId: orderFindByVendorId.reducer,
  vendorOrderFindById: vendorOrderFindById.reducer,
  //* sellCharge
  sellChargeFindByVId: sellChargeFindByVId.reducer,
  sellChargeFindById: sellChargeFindById.reducer,
  sellChargeRegister: sellChargeRegister.reducer,
  sellChargeUpdate: sellChargeUpdate.reducer,
  //* minPoint
  minPointFindById: minPointFindById.reducer,
  minPointFindByVId: minPointFindByVId.reducer,
  minPointRegister: minPointRegister.reducer,
  minPointUpdate: minPointUpdate.reducer,
  //* dealer
  dealerFindAll: dealerFindAll.reducer,
  dealerOrderFindAll: dealerOrderFindAll.reducer,
  setDealerStatus: setDealerStatus.reducer,
  dealerRegister: dealerRegister.reducer,
  dealerFindById: dealerFindById.reducer,
  orderFindByDealerId: orderFindByDealerId.reducer,
  dealerOrderFindById: dealerOrderFindById.reducer,
  //* goods
  optionSetSellStatus: optionSetSellStatus.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
  devTools: true,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
