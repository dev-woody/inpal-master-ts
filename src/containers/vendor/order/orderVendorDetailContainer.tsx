import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { vendorOrderFindByIdActions } from "reducers/vendor/order/findById";
import VendorOrderDetail from "components/vendor/order/vendorOrderDetail";

const OrderVendorDetailContainer = () => {
  const { vendorInfo } = useAppSelector((state) => ({
    vendorInfo: state.vendorOrderFindById.data,
  }));
  const dispatch = useAppDispatch();
  const { id } = useParams();

  // useEffect(() => {
  //   dispatch(vendorOrderFindByIdActions.getFindById({ id }));
  // }, [dispatch, id]);

  return <VendorOrderDetail vendorInfo={vendorInfo} />;
};

export default OrderVendorDetailContainer;
