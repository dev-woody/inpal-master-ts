import { Routes, Route } from "react-router-dom";
import GroupIndex from "./group";

const GoodIndex = () => {
  return (
    <Routes>
      <Route path="/group/*" element={<GroupIndex />} />
    </Routes>
  );
};

export default GoodIndex;
