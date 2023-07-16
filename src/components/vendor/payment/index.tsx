import { Fragment } from "react";
import PageHeader from "lib/pages/pageHeader";
import { Responsive } from "lib/styles";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import PaymentListContainer from "containers/vendor/payment/paymentListContainer";
import VendorPaymentDetail from "./vendorPaymentDetail";

const VendorPaymentIndexBlock = styled(Responsive)``;

const VendorPaymentIndex = () => {
  return (
    <Routes>
      <Route path="/:vendorId" element={<PaymentListContainer />} />
      <Route path="/:vendorId/:id*" element={<VendorPaymentDetail />} />
    </Routes>
  );
};

export default VendorPaymentIndex;
