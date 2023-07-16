import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import GoodsGroupDetail from "components/goods/group/goodsGroupDetail";
import { goodFindByIdActions } from "reducers/goods/group/findById";
import { goodsSetSellStatusActions } from "reducers/goods/group/setSellStatus";

const GoodDetailContainer = () => {
  const { groupDetail, setSellStatus } = useAppSelector((state) => ({
    groupDetail: state.goodFindById.data,
    setSellStatus: state.goodsSetSellStatus,
  }));
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const onSetSellStatus = ({ data }: { data: any }) => {
    const { vendorId, id } = groupDetail;
    dispatch(
      goodsSetSellStatusActions.getSetSellStatus({
        vendorId,
        goodsGroupId: id,
        status: data.status,
      })
    );
  };

  useEffect(() => {
    dispatch(goodFindByIdActions.getFindById({ id }));
    return () => {
      dispatch(goodFindByIdActions.reset({}));
    };
  }, []);

  return (
    <GoodsGroupDetail
      groupDetail={groupDetail}
      onSetSellStatus={onSetSellStatus}
    />
  );
};

export default GoodDetailContainer;
