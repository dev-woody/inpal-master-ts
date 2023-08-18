import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { masterVendorActions } from "reducers/vendor/masterVendor";
import VendorList from "components/vendor/list/vendorList";
import { useParams } from "react-router-dom";

const VendorContainer = () => {
  const { countVendor, vendorList } = useAppSelector((store) => ({
    countVendor: store.masterVendor.countVendor,
    vendorList: store.masterVendor.pageVendor,
  }));
  const dispatch = useAppDispatch();
  const { vendorPageNum } = useParams();
  useEffect(() => {
    dispatch(
      masterVendorActions.pageVendor({
        isDesc: false,
        page: vendorPageNum,
        size: 10,
      })
    );
    return () => {
      dispatch(masterVendorActions.reset("pageVendor"));
    };
  }, []);
  return (
    <VendorList
      countVendor={countVendor}
      vendorList={vendorList}
      vendorPageNum={vendorPageNum}
    />
  );
};

export default VendorContainer;
