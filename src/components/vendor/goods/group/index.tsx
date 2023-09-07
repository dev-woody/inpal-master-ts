import { Route, Routes } from "react-router-dom";
import GoodsGroupContainer from "containers/vendor/goods/group/goodsGroupContainer";
import GoodDetailContainer from "containers/vendor/goods/group/goodsDetailContainer";
import GoodsItemDetailContainer from "containers/vendor/goods/item/goodsItemDetailContainer";
import EvaluationDetailContainer from "containers/vendor/goods/item/evaluationDetailContainer";

const GroupIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<GoodsGroupContainer />} />
      <Route path="/:groupId" element={<GoodDetailContainer />} />
      <Route path="/:groupId/item/:itemId" element={<GoodsItemDetailContainer />} />
      <Route
        path="/:groupId/item/:itemId/:evaluationId"
        element={<EvaluationDetailContainer />}
      />
      {/* <Route path="/option/:id/*" element={<GoodOptionDetailContainer />} /> */}
    </Routes>
  );
};

export default GroupIndex;
