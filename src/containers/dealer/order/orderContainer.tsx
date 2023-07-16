// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import DealerOrder from "components/dealer/order/dealerOrder";
import { useParams } from "react-router-dom";
// import { orderFindByDealerIdActions } from "reducers/dealer/order/findByDealerId";

const OrderContainer = () => {
  const { orderList } = useAppSelector((state) => ({
    orderList: state.orderFindByDealerId,
  }));
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const { id } = useParams();

  // useEffect(() => {
  //   dispatch(
  //     orderFindByDealerIdActions.getFindByDealerId({
  //       dealerId: id,
  //       isDesc: true,
  //     })
  //   );
  //    return () => {
  //      dispatch(orderFindByDealerIdActions.reset({}));
  //}
  // }, []);

  return <DealerOrder orderList={orderList} id={id} />;
};

export default OrderContainer;
