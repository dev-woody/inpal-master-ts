import SellChargeList from "components/vendor/sellCharge/sellChargeList";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { sellChargeFindByVIdActions } from "reducers/vendor/sellCharge/findByVId";

const SellChargeContainer = () => {
  const { sellChargeList } = useAppSelector((state) => ({
    sellChargeList: state.sellChargeFindByVId,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { vendorId } = useParams();

  useEffect(() => {
    dispatch(
      sellChargeFindByVIdActions.getFindByVId({
        data: { vendorId: vendorId, isDesc: false },
      })
    );
    return () => {
      dispatch(sellChargeFindByVIdActions.reset({}));
    };
  }, []);

  return (
    <SellChargeList
      sellChargeList={sellChargeList}
      navigate={navigate}
      vendorId={vendorId}
    />
  );
};

export default SellChargeContainer;
