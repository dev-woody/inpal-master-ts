import { Routes, Route } from "react-router-dom";
import ProductIndex from "./product";
import ManufacturerIndex from "./manufacturer";
import UnitIndex from "components/code/unit";
import CategoryIndex from "./category";
import PropertyIndex from "./property";

const CodeIndex = () => {
  return (
    <Routes>
      <Route path="/product/*" element={<ProductIndex />} />
      <Route path="/category/*" element={<CategoryIndex />} />
      <Route path="/manufacturer/*" element={<ManufacturerIndex />} />
      <Route path="/unit/*" element={<UnitIndex />} />
      <Route path="/property/*" element={<PropertyIndex />} />
    </Routes>
  );
};

export default CodeIndex;
