import styled from "styled-components";
import { Responsive } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import CategoryContainer from "containers/code/category/categoryContainer";

const CategoryIndexBlock = styled(Responsive)``;

const CategoryIndex = () => {
  return (
    <Fragment>
      <CategoryIndexBlock>
        <PageHeader title="카테고리 관리" />
      </CategoryIndexBlock>
      <Routes>
        <Route path="/" element={<CategoryContainer />} />
      </Routes>
    </Fragment>
  );
};

export default CategoryIndex;
