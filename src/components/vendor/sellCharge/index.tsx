import styled from "styled-components";
import { Responsive } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import SellChargeContainer from "containers/vendor/sellCharge/sellChargeContainer";
import SellChargeRegisterContainer from "containers/vendor/sellCharge/sellChargeRegisterContainer";
import SellChargeEditContainer from "containers/vendor/sellCharge/sellChargeEditContainer";

const SellChargeIndexBlock = styled(Responsive)``;

const SellChargeIndex = () => {
  return (
    <Fragment>
      <SellChargeIndexBlock>
        <PageHeader title="판매 수수료 관리" />
      </SellChargeIndexBlock>
      <Routes>
        <Route path="/:vendorId" element={<SellChargeContainer />} />
        <Route
          path="/:vendorId/register"
          element={<SellChargeRegisterContainer />}
        />
        <Route
          path="/:vendorId/detail/:id"
          element={<SellChargeEditContainer />}
        />
      </Routes>
    </Fragment>
  );
};

export default SellChargeIndex;
