import { Route, Routes } from "react-router-dom";
import VendorListIndex from "./list";
import VendorPaymentIndex from "./payment";
import SellChargeIndex from "./sellCharge";

const VendorIndex = () => {
  return (
    <Routes>
      <Route path="/list/*" element={<VendorListIndex />} />
      <Route path="/payment/*" element={<VendorPaymentIndex />} />
    </Routes>
  );
};

export default VendorIndex;
