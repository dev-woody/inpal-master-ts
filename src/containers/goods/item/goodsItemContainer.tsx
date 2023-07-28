import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import GoodsItem from "components/goods/item/goodsItem";
import { masterGoodsItemActions } from "reducers/goods/goodsItem";

const GoodsItemContainer = () => {
  const { itemList } = useAppSelector((state) => ({
    itemList: state.masterGoodsItem.findByGoodsGroupId,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(
      masterGoodsItemActions.findByGoodsGroupId({
        goodGroupId: id,
        isDesc: false,
      })
    );
    return () => {
      dispatch(masterGoodsItemActions.reset("findByGoodsGroupId"));
    };
  }, []);

  return <GoodsItem itemList={itemList} />;
};

export default GoodsItemContainer;
