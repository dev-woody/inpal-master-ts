import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import DealerList from "components/dealer/list/dealerList";

const DealerContainer = () => {
  const { dealerInfo } = useAppSelector((state) => ({
    dealerInfo: state.dealerFindAll.data,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return <DealerList dealerInfo={dealerInfo} />;
};

export default DealerContainer;
