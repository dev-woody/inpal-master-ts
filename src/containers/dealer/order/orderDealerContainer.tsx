import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import DealerOrder from "components/dealer/order/dealerOrder";
import { orderFindByDealerIdActions } from "reducers/dealer/order/findByDealerId";

const OrderDealerContainer = () => {
  const { orderList } = useAppSelector((state) => ({
    orderList: state.orderFindByDealerId.data,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // useEffect(() => {
  //   dispatch(
  //     orderFindByDealerIdActions.getFindByDealerId({
  //       dealerId: id,
  //       isDesc: true,
  //     })
  //   );
  // }, []);

  return <DealerOrder orderList={orderList} id={id} />;
};

export default OrderDealerContainer;
