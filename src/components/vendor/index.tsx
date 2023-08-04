import { Route, Routes } from "react-router-dom";
import VendorListIndex from "./list";
import MinPointIndex from "./minPoint";
import VendorPaymentIndex from "./payment";
import SellChargeIndex from "./sellCharge";

const VendorIndex = () => {
  return (
    <Routes>
      <Route path="/list/*" element={<VendorListIndex />} />
      <Route path="/payment/*" element={<VendorPaymentIndex />} />
      <Route path="/sellCharge/*" element={<SellChargeIndex />} />
      <Route path="/minPoint/*" element={<MinPointIndex />} />
    </Routes>
  );
};

export default VendorIndex;
