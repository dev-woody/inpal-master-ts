import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import VendorOrderDetail from "components/vendor/order/vendorOrderDetail";
import { masterVendorActions } from "reducers/vendor/masterVendor";
import { checkStatus } from "types/globalTypes";

const OrderVendorDetailContainer = () => {
  const { orderFindById, orderLog, setOrderStatus } = useAppSelector(
    (store) => ({
      orderFindById: store.masterVendor.orderFindById,
      orderLog: store.masterVendor.orderLog,
      setOrderStatus: store.masterVendor.setOrderStatus,
    })
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams();

  const onSubmit = (data: object) => {
    dispatch(
      masterVendorActions.setOrderStatus({
        // orderByVendorId: "",
        orderItemId: orderId,
        ...data,
      })
    );
  };

  useEffect(() => {
    dispatch(masterVendorActions.orderFindById(orderId));
    return () => {
      dispatch(masterVendorActions.reset("orderFindById"));
      dispatch(masterVendorActions.reset("setOrderStatus"));
      dispatch(masterVendorActions.reset("orderFindById"));
    };
  }, []);

  useEffect(() => {
    console.log(setOrderStatus.status);
    if (checkStatus(setOrderStatus.status)) {
      dispatch(masterVendorActions.reset("setOrderStatus"));
      dispatch(masterVendorActions.orderFindById(orderId));
      setModalVisible(true);
    }
  }, [setOrderStatus]);

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
      setOrderStatus={setOrderStatus}
      onSubmit={onSubmit}
      navigate={navigate}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default OrderVendorDetailContainer;
