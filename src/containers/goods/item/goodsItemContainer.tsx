import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import GoodsItem from "components/goods/item/goodsItem";
import { itemFindByGroupIdActions } from "reducers/goods/item/findByGoodsGroupId";

const GoodsItemContainer = () => {
  const { itemList } = useAppSelector((state) => ({
    itemList: state.itemFindByGroupId.data,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const splitUrl = location.pathname.split("/");

  useEffect(() => {
    dispatch(
      itemFindByGroupIdActions.getFindByGroupId({
        goodsGroupId: splitUrl[splitUrl.length - 1],
        isDesc: true,
      })
    );
    return () => {
      dispatch(itemFindByGroupIdActions.reset({}));
    };
  }, []);

  return <GoodsItem itemList={itemList} />;
};

export default GoodsItemContainer;
