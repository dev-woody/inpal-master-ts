import PageHeader from "lib/pages/pageHeader";
import { Responsive } from "lib/styles";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import GoodOption from "./goodOption";

const OptionIndexBlock = styled(Responsive)``;

const OptionIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<GoodOption />} />
    </Routes>
  );
};

export default OptionIndex;
