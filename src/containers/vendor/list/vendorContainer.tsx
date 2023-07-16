import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { masterVendorActions } from "reducers/vendor/masterVendor";
import VendorList from "components/vendor/list/vendorList";

const VendorContainer = () => {
  const { vendorList } = useAppSelector((state) => ({
    vendorList: state.masterVendor.findAll,
  }));
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(masterVendorActions.findAll(false));
    return () => {
      dispatch(masterVendorActions.reset("findAll"));
    };
  }, []);
  return <VendorList vendorList={vendorList} />;
};

export default VendorContainer;
