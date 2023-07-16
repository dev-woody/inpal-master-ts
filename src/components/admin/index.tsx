import { Route, Routes } from "react-router-dom";
import ColorIndex from "./color";
import CuponIndex from "./cupon";
import MasterListIndex from "./list";

const MasterIndex = () => {
  return (
    <Routes>
      <Route path="/master/*" element={<MasterListIndex />} />
      <Route path="/color/*" element={<ColorIndex />} />
      <Route path="/cupon/*" element={<CuponIndex />} />
    </Routes>
  );
};

export default MasterIndex;
