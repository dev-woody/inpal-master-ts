import { Routes, Route } from "react-router-dom";
import CuponAddContainer from "containers/admin/cupon/cuponAddContainer";
import CuponContainer from "containers/admin/cupon/cuponContainer";
import CuponDetailContainer from "containers/admin/cupon/cuponDetailContainer";

const CuponIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<CuponContainer />} />
      <Route path="/register" element={<CuponAddContainer />} />
      <Route path="/detail/:id" element={<CuponDetailContainer />} />
    </Routes>
  );
};

export default CuponIndex;
