import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import DealerList from "components/dealer/list/dealerList";
import { masterDealerActions } from "reducers/dealer/masterDealer";

const DealerContainer = () => {
  const { dealerList } = useAppSelector((store) => ({
    dealerList: store.masterDealer.findAll,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(masterDealerActions.findAll(false));
  }, []);

  return <DealerList dealerList={dealerList} />;
};

export default DealerContainer;
