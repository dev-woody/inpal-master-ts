import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
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
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(masterGoodsItemActions.countGoodsItem({ goodGroupId: id }));
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "itemPageInfo",
      JSON.stringify({
        pageNum: searchParams.get("pageNum"),
        isDesc: searchParams.get("isDesc"),
      })
    );
    dispatch(
      masterGoodsItemActions.pageGoodsItem({
        goodGroupId: id,
        page: searchParams.get("pageNum"),
        isDesc: searchParams.get("isDesc"),
        size: 10,
      })
    );
    return () => {
      dispatch(masterGoodsItemActions.reset("pageGoodsItem"));
    };
  }, [searchParams.get("pageNum"), searchParams.get("isDesc")]);

  return <GoodsItem itemList={itemList} countGoodsItem={countGoodsItem} />;
};

export default GoodsItemContainer;
