import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import VendorOrder from "components/vendor/order/vendorOrder";
import { vendorOrderFindAllActions } from "reducers/vendor/order/findAll";

const OrderListContainer = () => {
  const { orderList } = useAppSelector((state) => ({
    orderList: state.vendorOrderFindAll.data,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(vendorOrderFindAllActions.getFindAll({ reverse: true }));
  // }, []);

  return <VendorOrder orderList={orderList} />;
};

export default OrderListContainer;
