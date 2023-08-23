import { Fragment } from "react";
import PageHeader from "lib/pages/pageHeader";
import { Responsive } from "lib/styles";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import OrderListContainer from "containers/vendor/order/orderListContainer";
import OrderVendorDetailContainer from "containers/vendor/order/orderVendorDetailContainer";

const VendorOrderIndexBlock = styled(Responsive)``;

const VendorOrderIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<OrderListContainer />} />
      <Route path="/:orderId/*" element={<OrderVendorDetailContainer />} />
    </Routes>
  );
};

export default VendorOrderIndex;
