import styled from "styled-components";
import { Responsive } from "lib/styles";
import { Routes, Route } from "react-router-dom";
import ManufacturerContainer from "containers/code/manufacturer/manufacturerContainer";
import ManufacturerAddContainer from "containers/code/manufacturer/manufacturerAddConteiner";
import ManufacturerEditIndex from "./editIndex";

const ManufacturerIndexBlock = styled(Responsive)``;

const ManufacturerIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<ManufacturerContainer />} />
      <Route path="/register" element={<ManufacturerAddContainer />} />
      <Route path="/detail/:id" element={<ManufacturerEditIndex />} />
    </Routes>
  );
};

export default ManufacturerIndex;
