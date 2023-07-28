import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import GoodsGroupDetail from "components/goods/group/goodsGroupDetail";
import { masterGoodsGroupActions } from "reducers/goods/goodsGroup";

const GoodDetailContainer = () => {
  const { groupDetail } = useAppSelector((state) => ({
    groupDetail: state.masterGoodsGroup.findById,
  }));
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(masterGoodsGroupActions.findById(id));
    return () => {
      dispatch(masterGoodsGroupActions.reset("findById"));
    };
  }, []);

  return <GoodsGroupDetail groupDetail={groupDetail} />;
};

export default GoodDetailContainer;
