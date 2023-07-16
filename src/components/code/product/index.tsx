import { Fragment } from "react";
import styled from "styled-components";
import { Responsive } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { Routes, Route } from "react-router-dom";
import ProductContainer from "containers/code/product/productContainer";
import ProductAddContainer from "containers/code/product/productAddContainer";
import ProductEditContainer from "containers/code/product/productEditContainer";

const ProductIndexBlock = styled(Responsive)``;

const ProductIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductContainer />} />
      <Route path="/detail/:id" element={<ProductEditContainer />} />
      <Route path="/register" element={<ProductAddContainer />} />
    </Routes>
  );
};

export default ProductIndex;
