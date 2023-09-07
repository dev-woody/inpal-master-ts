import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { masterGoodsGroupActions } from "reducers/goods/goodsGroup";
import GoodsGroupDetail from "components/vendor/goods/group/goodsGroupDetail";

const GoodDetailContainer = () => {
  const { groupDetail } = useAppSelector((state) => ({
    groupDetail: state.masterGoodsGroup.findById,
  }));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { groupId } = useParams();

  useEffect(() => {
    dispatch(masterGoodsGroupActions.findById(groupId));
    return () => {
      dispatch(masterGoodsGroupActions.reset("findById"));
    };
  }, []);

  return <GoodsGroupDetail groupDetail={groupDetail} navigate={navigate} />;
};

export default GoodDetailContainer;
