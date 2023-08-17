import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import VendorOrder from "components/vendor/order/vendorOrder";
import { masterVendorActions } from "reducers/vendor/masterVendor";
const OrderListContainer = () => {
  const { orderList } = useAppSelector((state) => ({
    orderList: state.masterVendor.orderItemFindByVendorId,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(
      masterVendorActions.orderItemFindByVendorId({
        vendorId: id,
        isDesc: true,
      })
    );
  }, []);

  return <VendorOrder orderList={orderList} id={id} />;
};

export default OrderListContainer;
