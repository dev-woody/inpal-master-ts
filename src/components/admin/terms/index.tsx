import TermsAddContainer from "containers/admin/terms/termsAddContainer";
import TermsContainer from "containers/admin/terms/termsContainer";
import TermsDetailContainer from "containers/admin/terms/termsDetailContainer";
import { Responsive } from "lib/styles";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

const TermsIndexBlock = styled(Responsive)``;

const TermsIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<TermsContainer />} />
      <Route path="/register" element={<TermsAddContainer />} />
      <Route path="/detail/:id/*" element={<TermsDetailContainer />} />
    </Routes>
  );
};

export default TermsIndex;
