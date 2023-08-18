import { Route, Routes } from "react-router-dom";
import GoodsGroupContainer from "containers/goods/group/goodsGroupContainer";
import GoodDetailContainer from "containers/goods/group/goodsDetailContainer";
import GoodsItemDetailContainer from "containers/goods/item/goodsItemDetailContainer";
import EvaluationDetailContainer from "containers/goods/item/evaluationDetailContainer";

const GroupIndex = () => {
  return (
    <Routes>
      <Route path="/:goodsGroupPageNum" element={<GoodsGroupContainer />} />
      <Route path="/:goodsGroupPageNum/:id" element={<GoodDetailContainer />} />
      <Route
        path="/:goodsGroupPageNum/:id/item/:goodsItemPageNum/:itemId"
        element={<GoodsItemDetailContainer />}
      />
      <Route
        path="/:goodsGroupPageNum/:id/item/:goodsItemPageNum/:itemId/:evaluationId"
        element={<EvaluationDetailContainer />}
      />
      {/* <Route path="/option/:id/*" element={<GoodOptionDetailContainer />} /> */}
    </Routes>
  );
};

export default GroupIndex;
