import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import GoodsItemDetail from "components/goods/item/goodsItemDetail";
import { itemFindByIdActions } from "reducers/goods/item/findById";
import { itemSetSellStatusActions } from "reducers/goods/item/setSellStatus";
import { testItemData } from "types/data.test";

const GoodsItemDetailContainer = () => {
  const { itemInfo } = useAppSelector((state) => ({
    itemInfo: state.itemFindById.data,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const splitUrl = location.pathname.split("/");

  const onSetSellStatus = ({ data }: { data: any }) => {
    dispatch(
      itemSetSellStatusActions.getSetSellStatus({
        vendorId: testItemData[0].id,
        goodsGroupId: testItemData[0].goodsGroupId,
        optionId: testItemData[0].id,
        status: data.status,
      })
    );
  };

  useEffect(() => {
    dispatch(
      itemFindByIdActions.getFindById({
        goodsGroupId: splitUrl[splitUrl.length - 1],
      })
    );
    return () => {
      dispatch(itemFindByIdActions.reset({}));
    };
  }, []);

  return (
    <GoodsItemDetail
      itemInfo={itemInfo}
      onSetSellStatus={onSetSellStatus}
      id={id}
    />
  );
};

export default GoodsItemDetailContainer;
