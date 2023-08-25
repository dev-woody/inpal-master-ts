import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import VendorOrder from "components/vendor/order/vendorOrder";
import { masterVendorActions } from "reducers/vendor/masterVendor";
const OrderListContainer = () => {
  const { orderList, countOrder } = useAppSelector((store) => ({
    countOrder: store.masterVendor.countOrder,
    orderList: store.masterVendor.pageOrder,
  }));
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const onSelect = (status: string) => {
    console.log(status);
  };

  useEffect(() => {
    dispatch(masterVendorActions.countOrder(id));
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "orderPageInfo",
      JSON.stringify({
        pageNum: searchParams.get("pageNum"),
        isDesc: searchParams.get("isDesc"),
      })
    );
    dispatch(
      masterVendorActions.pageOrder({
        vendorId: id,
        page: searchParams.get("pageNum"),
        isDesc: searchParams.get("isDesc"),
        size: 10,
      })
    );
  }, [searchParams.get("pageNum"), searchParams.get("isDesc")]);

  return (
    <VendorOrder
      countOrder={countOrder}
      orderList={orderList}
      id={id}
      onSelect={onSelect}
    />
  );
};

export default OrderListContainer;
