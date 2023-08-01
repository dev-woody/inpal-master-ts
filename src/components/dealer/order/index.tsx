import { Fragment } from "react";
import PageHeader from "lib/pages/pageHeader";
import { Responsive } from "lib/styles";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import OrderContainer from "containers/dealer/order/orderContainer";
import OrderDetailContainer from "containers/dealer/order/orderDetailContainer";
import OrderVendorContainer from "containers/dealer/order/orderVendorContainer";
import OrderDealerContainer from "containers/dealer/order/orderDealerContainer";

const DealerOrderIndexBlock = styled(Responsive)``;

const DealerOrderIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<OrderContainer />} />
      <Route path="/:id/*" element={<OrderDetailContainer />} />
      {/* <Route path="/vendor/:id/*" element={<OrderVendorContainer />} /> */}
      <Route path="/orderByDealerId/:id/*" element={<OrderDealerContainer />} />
    </Routes>
  );
};

export default DealerOrderIndex;
