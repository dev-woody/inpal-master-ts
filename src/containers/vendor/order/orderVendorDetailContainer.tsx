import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import VendorOrderDetail from "components/vendor/order/vendorOrderDetail";
import { masterVendorActions } from "reducers/vendor/masterVendor";
import { checkStatus } from "types/globalTypes";

const OrderVendorDetailContainer = () => {
  const { orderFindById, orderLog } = useAppSelector((state) => ({
    orderFindById: state.masterVendor.orderFindById,
    orderLog: state.masterVendor.orderLog,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams();

  useEffect(() => {
    dispatch(masterVendorActions.orderFindById(orderId));
  }, []);

  useEffect(() => {
    if (checkStatus(orderFindById.status)) {
      dispatch(
        masterVendorActions.orderLog({
          itemId: orderId,
          isDesc: true,
        })
      );
    }
  }, [orderFindById]);

  return (
    <VendorOrderDetail
      orderInfo={orderFindById}
      orderLog={orderLog}
      navigate={navigate}
    />
  );
};

export default OrderVendorDetailContainer;
