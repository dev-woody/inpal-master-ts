import { Routes, Route } from "react-router-dom";
import DealerListIndex from "./list";
import DealerOrderIndex from "./order";

const DealerIndex = () => {
  return (
    <Routes>
      <Route path="/list/*" element={<DealerListIndex />} />
      <Route path="/order/*" element={<DealerOrderIndex />} />
    </Routes>
  );
};

export default DealerIndex;
