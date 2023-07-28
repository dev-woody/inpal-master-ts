import { Route, Routes } from "react-router-dom";
import GoodsGroupContainer from "containers/goods/group/goodsGroupContainer";
import GoodDetailContainer from "containers/goods/group/goodsDetailContainer";
import GoodsItemDetailContainer from "containers/goods/item/goodsItemDetailContainer";
import GoodOptionDetailContainer from "containers/goods/option/goodOptionDetailContainer";

const GroupIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<GoodsGroupContainer />} />
      <Route path="/:id/*" element={<GoodDetailContainer />} />
      <Route
        path="/:id/item/:itemId/*"
        element={<GoodsItemDetailContainer />}
      />
      {/* <Route path="/option/:id/*" element={<GoodOptionDetailContainer />} /> */}
    </Routes>
  );
};

export default GroupIndex;
