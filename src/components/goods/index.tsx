import { Routes, Route } from "react-router-dom";
import GroupIndex from "./group";
import ItemIndex from "./item";

const GoodIndex = () => {
  return (
    <Routes>
      <Route path="/group/*" element={<GroupIndex />} />
      <Route path="/sell/*" element={<ItemIndex />} />
    </Routes>
  );
};

export default GoodIndex;
