import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { masterVendorActions } from "reducers/vendor/masterVendor";
import VendorList from "components/vendor/list/vendorList";
import { useNavigate, useSearchParams } from "react-router-dom";

const VendorContainer = () => {
  const { countVendor, vendorList } = useAppSelector((store) => ({
    countVendor: store.masterVendor.countVendor,
    vendorList: store.masterVendor.pageVendor,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(masterVendorActions.countVendor({}));
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "vendorPageInfo",
      JSON.stringify({
        pageNum: searchParams.get("pageNum"),
        isDesc: searchParams.get("isDesc"),
      })
    );
    dispatch(
      masterVendorActions.pageVendor({
        isDesc: searchParams.get("isDesc"),
        page: searchParams.get("pageNum"),
        size: 10,
      })
    );
    return () => {
      dispatch(masterVendorActions.reset("pageVendor"));
    };
  }, [searchParams.get("pageNum"), searchParams.get("isDesc")]);

  useEffect(() => {
    navigate(`?pageNum=0&isDesc=false`);
  }, []);

  return <VendorList countVendor={countVendor} vendorList={vendorList} />;
};

export default VendorContainer;
