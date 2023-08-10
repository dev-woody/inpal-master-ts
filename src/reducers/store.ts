import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all, fork } from "redux-saga/effects";
import user from "./user";
import { loadingSlice } from "./loading";

import masterAdmin, { masterAdminSaga } from "./admin/masterAdmin";
import masterVendor, { masterVendorSaga } from "./vendor/masterVendor";
import masterColor, { masterColorSaga } from "./admin/masterColor";
import masterCupon, { masterCuponSaga } from "./admin/masterCupon";
import masterTerms, { masterTermsSaga } from "./admin/masterTerms";
import masterProduct, { masterProductSaga } from "./product/masterProduct";
import masterManufacturer, {
  masterManufacturerSaga,
} from "./product/masterManufecturer";
import masterCategory, { masterCategorySaga } from "./product/masterCategory";
import masterUnit, { masterUnitSaga } from "./product/masterUnit";
import masterProperty, { masterPropertySaga } from "./product/masterProperty";
import masterGoodsGroup, { masterGoodsGroupSaga } from "./goods/goodsGroup";
import masterGoodsItem, { masterGoodsItemSaga } from "./goods/goodsItem";
import masterGoodsEvaluation, {
  masterGoodsEvaluationSaga,
} from "./goods/goodsEvaluation";
import masterDealer, { masterDealerSaga } from "./dealer/masterDealer";

//* vendor
import paymentFindById, {
  paymentFindByIdSaga,
} from "./vendor/payment/findById";

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
import dealerOrderFindAll, {
  dealerOrderFindAllSaga,
} from "./dealer/order/findAll";
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
    fork(masterTermsSaga),
    fork(masterProductSaga),
    fork(masterManufacturerSaga),
    fork(masterCategorySaga),
    fork(masterUnitSaga),
    fork(masterPropertySaga),
    fork(masterGoodsGroupSaga),
    fork(masterGoodsItemSaga),
    fork(masterGoodsEvaluationSaga),
    fork(masterDealerSaga),
    //* vendor
    fork(paymentFindByIdSaga),
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
    fork(dealerOrderFindAllSaga),
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
  masterTerms: masterTerms.reducer,
  masterProduct: masterProduct.reducer,
  masterManufacturer: masterManufacturer.reducer,
  masterCategory: masterCategory.reducer,
  masterUnit: masterUnit.reducer,
  masterProperty: masterProperty.reducer,
  masterGoodsGroup: masterGoodsGroup.reducer,
  masterGoodsEvaluation: masterGoodsEvaluation.reducer,
  masterGoodsItem: masterGoodsItem.reducer,

  masterDealer: masterDealer.reducer,
  //* vendor
  paymentFindById: paymentFindById.reducer,
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
  dealerOrderFindAll: dealerOrderFindAll.reducer,
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
