import { Routes, Route } from "react-router-dom";
import VendorContainer from "containers/vendor/list/vendorContainer";
import VendorDetailContainer from "containers/vendor/list/vendorDetailContainer";
import SellChargeIndex from "../sellCharge";
import VendorOrderIndex from "../order";

const VendorListIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<VendorContainer />} />
      <Route path="/:id" element={<VendorDetailContainer />} />
      <Route path="/:id/sellFees/*" element={<SellChargeIndex />} />
      <Route path="/:id/order/*" element={<VendorOrderIndex />} />
    </Routes>
  );
};

export default VendorListIndex;
