import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import VendorOrder from "components/vendor/order/vendorOrder";
import { masterVendorActions } from "reducers/vendor/masterVendor";
import { response } from "types/globalTypes";
const OrderListContainer = () => {
  const { orderList, countOrder, statusOrderList, stausCountOrder } =
    useAppSelector((store) => ({
      countOrder: store.masterVendor.countOrder,
      orderList: store.masterVendor.pageOrder,
      stausCountOrder: store.masterVendor.countOrderVendorId,
      statusOrderList: store.masterVendor.pageOrderVendorId,
    }));
  const [orderItems, setOrderItems] = useState<response>({
    success: false,
    data: {},
    message: "",
    status: "idle",
  });
  const [orderPages, setOrderPages] = useState<response>({
    success: false,
    data: {},
    message: "",
    status: "idle",
  });
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const onSelect = (status: string) => {
    setSearchParams({ pageNum: "0", isDesc: "false", status: status });
  };

  useEffect(() => {
    if (searchParams.get("status") === "ALL") {
      dispatch(masterVendorActions.countOrder(id));
    } else {
      dispatch(
        masterVendorActions.countOrderVendorId({
          vendorId: id,
          orderStatus: searchParams.get("status"),
        })
      );
    }
  }, [searchParams.get("status")]);

  useEffect(() => {
    if (searchParams.get("status") === "ALL") {
      sessionStorage.setItem(
        "orderPageInfo",
        JSON.stringify({
          pageNum: searchParams.get("pageNum"),
          isDesc: searchParams.get("isDesc"),
          status: searchParams.get("status"),
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
    } else {
      sessionStorage.setItem(
        "orderPageInfo",
        JSON.stringify({
          pageNum: searchParams.get("pageNum"),
          isDesc: searchParams.get("isDesc"),
          status: searchParams.get("status"),
        })
      );
      dispatch(
        masterVendorActions.pageOrderVendorId({
          vendorId: id,
          page: searchParams.get("pageNum"),
          isDesc: searchParams.get("isDesc"),
          orderStatus: searchParams.get("status"),
          size: 10,
        })
      );
    }
  }, [
    searchParams.get("pageNum"),
    searchParams.get("isDesc"),
    searchParams.get("status"),
  ]);

  useEffect(() => {
    setOrderItems(orderList);
  }, [orderList]);

  useEffect(() => {
    setOrderItems(statusOrderList);
  }, [statusOrderList]);

  useEffect(() => {
    setOrderPages(countOrder);
  }, [countOrder]);

  useEffect(() => {
    setOrderPages(stausCountOrder);
  }, [stausCountOrder]);

  return (
    <VendorOrder
      countOrder={orderPages}
      orderList={orderItems}
      id={id}
      onSelect={onSelect}
    />
  );
};

export default OrderListContainer;
