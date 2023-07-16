import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import DealerOrderDetail from "components/dealer/order/delaerOrderDetail";
import { dealerOrderFindByIdActions } from "reducers/dealer/order/findById";

const OrderDetailContainer = () => {
  const { orderInfo } = useAppSelector((state) => ({
    orderInfo: state.dealerOrderFindById,
  }));
  const dispatch = useAppDispatch();
  const { id } = useParams();

  // useEffect(() => {
  //   dispatch(dealerOrderFindByIdActions.getFindById({ id }));
  // }, []);

  return <DealerOrderDetail orderInfo={orderInfo} />;
};

export default OrderDetailContainer;
