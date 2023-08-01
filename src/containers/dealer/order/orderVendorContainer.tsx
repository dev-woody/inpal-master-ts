import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
// import { vendorOrderFindByIdActions } from "reducers/vendor/order/findById";
import DealerVendorOrder from "components/dealer/order/dealerVendorOrder";

const OrderVendorContainer = () => {
  // const { vendorInfo } = useAppSelector((state) => ({
  //   vendorInfo: state.vendorOrderFindById.data,
  // }));
  const dispatch = useAppDispatch();
  const { id } = useParams();

  // useEffect(() => {
  //   dispatch(vendorOrderFindByIdActions.getFindById({ id }));
  // }, [dispatch, id]);

  // return <DealerVendorOrder vendorInfo={vendorInfo} id={id} />;
};

export default OrderVendorContainer;
