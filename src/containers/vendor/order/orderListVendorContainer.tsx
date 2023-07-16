import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import VendorOrder from "components/vendor/order/vendorOrder";
import { orderFindByVendorIdActions } from "reducers/vendor/order/findByVendorId";

const OrderListVendorContainer = () => {
  const { orderList } = useAppSelector((state) => ({
    orderList: state.orderFindByVendorId.data,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const splitUrl = location.pathname.split("/");

  // useEffect(() => {
  //   dispatch(
  //     orderFindByVendorIdActions.getFindAllByVendorId({
  //       vendorId: splitUrl[splitUrl.length - 1],
  //       isDesc: true,
  //     })
  //   );
  // }, []);

  return <VendorOrder orderList={orderList} />;
};

export default OrderListVendorContainer;
