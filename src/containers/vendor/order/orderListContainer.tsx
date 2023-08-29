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
    setSearchParams({ n: "0", d: "false", s: status });
  };

  useEffect(() => {
    if (searchParams.get("status") === "ALL") {
      dispatch(masterVendorActions.countOrder(id));
    } else {
      dispatch(
        masterVendorActions.countOrderVendorId({
          vendorId: id,
          orderStatus: searchParams.get("s"),
        })
      );
    }
  }, [searchParams.get("s")]);

  useEffect(() => {
    if (searchParams.get("s") === "ALL") {
      sessionStorage.setItem(
        "orderPageInfo",
        JSON.stringify({
          n: searchParams.get("n"),
          d: searchParams.get("d"),
          s: searchParams.get("s"),
        })
      );
      dispatch(
        masterVendorActions.pageOrder({
          vendorId: id,
          page: searchParams.get("n"),
          isDesc: searchParams.get("d"),
          size: 10,
        })
      );
    } else {
      sessionStorage.setItem(
        "orderPageInfo",
        JSON.stringify({
          n: searchParams.get("n"),
          d: searchParams.get("d"),
          s: searchParams.get("s"),
        })
      );
      dispatch(
        masterVendorActions.pageOrderVendorId({
          vendorId: id,
          page: searchParams.get("n"),
          isDesc: searchParams.get("d"),
          orderStatus: searchParams.get("s"),
          size: 10,
        })
      );
    }
  }, [searchParams.get("n"), searchParams.get("d"), searchParams.get("s")]);

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
