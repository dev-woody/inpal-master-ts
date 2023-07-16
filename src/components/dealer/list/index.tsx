import { Route, Routes } from "react-router-dom";
import DealerContainer from "containers/dealer/list/dealerContainer";
import DealerDetailContainer from "containers/dealer/list/dealerDetailContainer";

const DealerListIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<DealerContainer />} />
      <Route path="/:id/*" element={<DealerDetailContainer />} />
    </Routes>
  );
};

export default DealerListIndex;
