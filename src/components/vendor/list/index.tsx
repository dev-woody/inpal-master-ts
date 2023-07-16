import { Routes, Route } from "react-router-dom";
import VendorContainer from "containers/vendor/list/vendorContainer";
import VendorDetailContainer from "containers/vendor/list/vendorDetailContainer";

const VendorListIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<VendorContainer />} />
      <Route path="/:id/*" element={<VendorDetailContainer />} />
    </Routes>
  );
};

export default VendorListIndex;
