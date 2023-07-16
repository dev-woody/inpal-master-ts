import styled from "styled-components";
import { Responsive } from "lib/styles";
import { Route, Routes } from "react-router-dom";
import UnitRegisterContainer from "containers/code/unit/unitRegisterContainer";
import UnitContainer from "containers/code/unit/unitContainer";
import UnitEditContainer from "containers/code/unit/unitEditContainer";

const UnitIndexBlock = styled(Responsive)``;

const UnitIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<UnitContainer />} />
      <Route path="/register" element={<UnitRegisterContainer />} />
      <Route path="/detail/:id" element={<UnitEditContainer />} />
    </Routes>
  );
};

export default UnitIndex;
