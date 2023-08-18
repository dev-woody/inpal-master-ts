import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import GoodsItem from "components/goods/item/goodsItem";
import { masterGoodsItemActions } from "reducers/goods/goodsItem";

const GoodsItemContainer = () => {
  const { countGoodsItem, itemList } = useAppSelector((store) => ({
    countGoodsItem: store.masterGoodsItem.countGoodsItem,
    itemList: store.masterGoodsItem.pageGoodsItem,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { goodsGroupPageNum, id, pageGoodsItem } = useParams();

  useEffect(() => {
    dispatch(masterGoodsItemActions.countGoodsItem({ goodsGroupId: id }));
  }, []);

  useEffect(() => {
    dispatch(
      masterGoodsItemActions.pageGoodsItem({
        goodGroupId: id,
        isDesc: false,
      })
    );
    return () => {
      dispatch(masterGoodsItemActions.reset("pageGoodsItem"));
    };
  }, []);

  return <GoodsItem itemList={itemList} />;
};

export default GoodsItemContainer;
