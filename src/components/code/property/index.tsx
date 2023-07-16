import { Fragment } from "react";
import styled from "styled-components";
import { Responsive } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { Routes, Route } from "react-router-dom";
import PropertyContainer from "containers/code/property/propertyContainer";
import PropertyAddContainer from "containers/code/property/propertyAddConteiner";
import PropertyDetailContainer from "containers/code/property/propertyDetailContainer";

const PropertyIndexBlock = styled(Responsive)``;

const PropertyIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<PropertyContainer />} />
      <Route path="/register" element={<PropertyAddContainer />} />
      <Route path="/detail/:id" element={<PropertyDetailContainer />} />
    </Routes>
  );
};

export default PropertyIndex;
