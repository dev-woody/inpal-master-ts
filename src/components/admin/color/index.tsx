import ColorListContainer from "containers/admin/color/colorListContainer";
import ColorEditContainer from "containers/admin/color/colorEditContainer";
import ColorRegisterContainer from "containers/admin/color/colorRegisterContainer";
import { Routes, Route } from "react-router-dom";

const ColorIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<ColorListContainer />} />
      <Route path="/register" element={<ColorRegisterContainer />} />
      <Route path="/detail/:name" element={<ColorEditContainer />} />
    </Routes>
  );
};

export default ColorIndex;
