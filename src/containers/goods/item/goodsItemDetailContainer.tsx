import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import GoodsItemDetail from "components/goods/item/goodsItemDetail";
import { masterGoodsItemActions } from "reducers/goods/goodsItem";

const GoodsItemDetailContainer = () => {
  const { itemInfo } = useAppSelector((state) => ({
    itemInfo: state.masterGoodsItem.findById,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id, itemId } = useParams();

  // const onSetSellStatus = ({ data }: { data: any }) => {
  //   dispatch(
  //     itemSetSellStatusActions.getSetSellStatus({
  //       vendorId: testItemData[0].id,
  //       goodsGroupId: testItemData[0].goodsGroupId,
  //       optionId: testItemData[0].id,
  //       status: data.status,
  //     })
  //   );
  // };

  useEffect(() => {
    dispatch(masterGoodsItemActions.findById(itemId));
    return () => {
      dispatch(masterGoodsItemActions.reset("findById"));
    };
  }, []);

  return (
    <GoodsItemDetail
      itemInfo={itemInfo}
      navigate={navigate}
      // onSetSellStatus={onSetSellStatus}
      id={id}
    />
  );
};

export default GoodsItemDetailContainer;
