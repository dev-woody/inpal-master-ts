import { Fragment } from "react";
import PageHeader from "lib/pages/pageHeader";
import { Responsive } from "lib/styles";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import GoodSell from "./goodSell";
import GoodSellDetail from "./goodSellDetail";

const SellIndexBlock = styled(Responsive)``;

const SellIndex = () => {
  return (
    <Fragment>
      <SellIndexBlock>
        <PageHeader title="판매량 관리" />
      </SellIndexBlock>
      <Routes>
        <Route path="/" element={<GoodSell />} />
        <Route path="/:id/*" element={<GoodSellDetail />} />
      </Routes>
    </Fragment>
  );
};

export default SellIndex;
