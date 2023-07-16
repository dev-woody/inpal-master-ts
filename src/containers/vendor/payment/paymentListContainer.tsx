import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import VendorPayment from "components/vendor/payment/vendorPayment";
import { paymentFindByIdActions } from "reducers/vendor/payment/findById";

const PaymentListContainer = () => {
  const { vendorPaymentInfo } = useAppSelector((state) => ({
    vendorPaymentInfo: state.paymentFindById.data,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { vendorId } = useParams();

  useEffect(() => {
    dispatch(paymentFindByIdActions.getFindById({ vendorId, isDesc: false }));
    return () => {
      dispatch(paymentFindByIdActions.reset({}));
    };
  }, []);

  return (
    <VendorPayment vendorPaymentInfo={vendorPaymentInfo} vendorId={vendorId} />
  );
};

export default PaymentListContainer;
