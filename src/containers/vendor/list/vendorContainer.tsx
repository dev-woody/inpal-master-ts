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
        n: searchParams.get("n"),
        d: searchParams.get("d"),
      })
    );
    dispatch(
      masterVendorActions.pageVendor({
        page: atob(searchParams.get("n") || btoa("0")),
        isDesc: atob(searchParams.get("d") || btoa("false")),
        size: 10,
      })
    );
    return () => {
      dispatch(masterVendorActions.reset("pageVendor"));
    };
  }, [searchParams.get("n"), searchParams.get("d")]);

  useEffect(() => {
    if ((searchParams.get("n") || searchParams.get("d")) === null) {
      navigate(`?n=${btoa("0")}&d=${btoa("false")}`);
    }
  }, [searchParams.get("n"), searchParams.get("d")]);

  return <VendorList countVendor={countVendor} vendorList={vendorList} />;
};

export default VendorContainer;
