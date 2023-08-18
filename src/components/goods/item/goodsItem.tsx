import { itemColumns } from "lib/columns/columnsList";
import PageHeader from "lib/pages/pageHeader";
import { Responsive } from "lib/styles";
import { Table } from "lib/styles/tableStyle";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { response } from "types/globalTypes";

const GoodsItemBlock = styled(Responsive)``;

type itemProps = {
  itemList: response;
};

const GoodsItem = ({ itemList }: itemProps) => {
  const { id } = useParams();
  return (
    <GoodsItemBlock>
      <PageHeader title="상품아이템 조회" />
      <Table
        columns={itemColumns}
        content={itemList.data}
        url={`/goods/group/${id}/item`}
        moveKey={["base", "id"]}
        pagenation
      />
    </GoodsItemBlock>
  );
};

export default GoodsItem;
