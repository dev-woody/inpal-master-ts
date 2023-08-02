import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import DealerDetail from "components/dealer/list/delaerDetail";
// import { setDealerStatusActions } from "reducers/dealer/setStatus";
// import { dealerRegisterActions } from "reducers/dealer/register";
// import { dealerFindByIdActions } from "reducers/dealer/findById";
import { masterDealerActions } from "reducers/dealer/masterDealer";
import { checkStatus } from "types/globalTypes";

const DealerDetailContainer = () => {
  const { dealerInfo, dealerApprove, setBizStatus } = useAppSelector(
    (state) => ({
      dealerInfo: state.masterDealer.findById,
      dealerApprove: state.masterDealer.approve,
      setBizStatus: state.masterDealer.setBizStatus,
    })
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const onApprove = () => {
    dispatch(masterDealerActions.approve(id));
  };

  const onSubmit = (data: any) => {
    dispatch(
      masterDealerActions.setBizStatus({
        dealerId: id,
        status: data.bizStatus,
      })
    );
  };

  useEffect(() => {
    if (checkStatus(dealerApprove.status) || checkStatus(setBizStatus.status)) {
      dispatch(masterDealerActions.findById(id));
      dispatch(masterDealerActions.reset("approve"));
      dispatch(masterDealerActions.reset("setBizStatus"));
    }
  }, [dealerApprove, setBizStatus]);

  useEffect(() => {
    dispatch(masterDealerActions.findById(id));
    return () => {
      dispatch(masterDealerActions.reset("findById"));
    };
  }, []);

  return (
    <DealerDetail
      dealerInfo={dealerInfo}
      onSubmit={onSubmit}
      onApprove={onApprove}
    />
  );
};

export default DealerDetailContainer;
