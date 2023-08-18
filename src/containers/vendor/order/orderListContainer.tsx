import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import VendorOrder from "components/vendor/order/vendorOrder";
import { masterVendorActions } from "reducers/vendor/masterVendor";
const OrderListContainer = () => {
  const { orderList, countOrder } = useAppSelector((store) => ({
    countOrder: store.masterVendor.countOrder,
    orderList: store.masterVendor.pageOrder,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { vendorPageNum, id, orderPageNum } = useParams();

  useEffect(() => {
    dispatch(masterVendorActions.countOrder(id));
  }, []);

  useEffect(() => {
    dispatch(
      masterVendorActions.pageOrder({
        vendorId: id,
        isDesc: true,
        size: 10,
        page: orderPageNum,
      })
    );
  }, [orderPageNum]);

  return (
    <VendorOrder
      countOrder={countOrder}
      orderList={orderList}
      vendorPageNum={vendorPageNum}
      id={id}
      orderPageNum={orderPageNum}
    />
  );
};

export default OrderListContainer;
