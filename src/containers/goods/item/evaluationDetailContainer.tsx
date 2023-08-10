import EvaluationDetail from "components/goods/item/evaluationDetail";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { masterGoodsEvaluationActions } from "reducers/goods/goodsEvaluation";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const EvaluationDetailContainer = () => {
  const { user, findById } = useAppSelector((store) => ({
    user: store.user,
    findById: store.masterGoodsEvaluation.findById,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { evaluationId } = useParams();

  useEffect(() => {
    dispatch(masterGoodsEvaluationActions.findById(evaluationId));
  }, []);

  return <EvaluationDetail evaluationInfo={findById} navigate={navigate} />;
};

export default EvaluationDetailContainer;
