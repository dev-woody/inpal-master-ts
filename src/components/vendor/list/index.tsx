import { Routes, Route } from "react-router-dom";
import VendorContainer from "containers/vendor/list/vendorContainer";
import VendorDetailContainer from "containers/vendor/list/vendorDetailContainer";
import SellChargeIndex from "../sellCharge";

const VendorListIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<VendorContainer />} />
      <Route path="/:id" element={<VendorDetailContainer />} />
      <Route path="/:id/sellFees/*" element={<SellChargeIndex />} />
    </Routes>
  );
};

export default VendorListIndex;
