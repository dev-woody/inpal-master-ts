import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import DealerDetail from "components/dealer/list/delaerDetail";
import { setDealerStatusActions } from "reducers/dealer/setStatus";
import { dealerRegisterActions } from "reducers/dealer/register";
import { dealerFindByIdActions } from "reducers/dealer/findById";
import { DataObj } from "types/globalTypes";

const DealerDetailContainer = () => {
  const { dealerRegister, setDealerStatus } = useAppSelector((state) => ({
    dealerRegister: state.dealerRegister.success,
    setDealerStatus: state.setDealerStatus.success,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const onRegister = () => {
    dispatch(dealerRegisterActions.getRegister({ id: id }));
  };

  const onSubmit = (data: DataObj<string>) => {
    dispatch(
      setDealerStatusActions.getSetStatus({
        dealerId: id,
        dealerStatus: data.dealerStatus,
      })
    );
  };

  useEffect(() => {
    if (dealerRegister || setDealerStatus) {
      dispatch(dealerFindByIdActions.getFindById({ id }));
      dispatch(dealerRegisterActions.reset({}));
      dispatch(setDealerStatusActions.reset({}));
    }
  }, [dealerRegister, setDealerStatus]);

  useEffect(() => {
    dispatch(dealerFindByIdActions.getFindById({ id }));
    return () => {
      dispatch(dealerFindByIdActions.reset({}));
    };
  }, []);

  return <DealerDetail onSubmit={onSubmit} onRegister={onRegister} />;
};

export default DealerDetailContainer;
