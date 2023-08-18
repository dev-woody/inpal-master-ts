import { Routes, Route } from "react-router-dom";
import VendorContainer from "containers/vendor/list/vendorContainer";
import VendorDetailContainer from "containers/vendor/list/vendorDetailContainer";
import SellChargeIndex from "../sellCharge";
import VendorOrderIndex from "../order";

const VendorListIndex = () => {
  return (
    <Routes>
      <Route path="/:vendorPageNum" element={<VendorContainer />} />
      <Route path="/:vendorPageNum/:id" element={<VendorDetailContainer />} />
      <Route
        path="/:vendorPageNum/:id/sellFees/*"
        element={<SellChargeIndex />}
      />
      <Route
        path="/:vendorPageNum/order/:id/:orderPageNum/*"
        element={<VendorOrderIndex />}
      />
    </Routes>
  );
};

export default VendorListIndex;
