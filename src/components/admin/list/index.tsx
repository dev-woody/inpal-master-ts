import { Fragment } from "react";
import PageHeader from "lib/pages/pageHeader";
import { Responsive } from "lib/styles";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import MasterContainer from "containers/admin/master/masterContainer";
import MasterDetailContainer from "containers/admin/master/masterDetailContainer";
import MasterRegisterContainer from "containers/admin/master/masterRegisterContainer";

const MasterListIndexBlock = styled(Responsive)``;

const MasterListIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<MasterContainer />} />
      <Route path="/register" element={<MasterRegisterContainer />} />
      <Route path="/detail/:userId/*" element={<MasterDetailContainer />} />
    </Routes>
  );
};

export default MasterListIndex;
