import PageHeader from "lib/pages/pageHeader";
import { Responsive } from "lib/styles";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import GoodsItemContainer from "containers/goods/item/goodsItemContainer";

const ItemIndexBlock = styled(Responsive)``;

const ItemIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<GoodsItemContainer />} />
    </Routes>
  );
};

export default ItemIndex;
