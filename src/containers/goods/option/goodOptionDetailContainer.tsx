import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import GoodOptionDetail from "components/goods/option/goodOptionDetail";
import { optionSetSellStatusActions } from "reducers/goods/option/setSellStatus";
import { testOptionData } from "types/data.test";

const GoodOptionDetailContainer = () => {
  const { setSellStatus } = useAppSelector((state) => ({
    setSellStatus: state.optionSetSellStatus.success,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const onSetSellStatus = ({ data }: { data: any }) => {
    dispatch(
      optionSetSellStatusActions.getSetSellStatus({
        vendorId: testOptionData[0].id,
        goodsGroupId: testOptionData[0].goodsGroupId,
        optionId: testOptionData[0].id,
        status: data.status,
      })
    );
  };

  useEffect(() => {
    return () => {
      dispatch(optionSetSellStatusActions.reset({}));
    };
  }, []);

  return <GoodOptionDetail onSetSellStatus={onSetSellStatus} id={id} />;
};

export default GoodOptionDetailContainer;
