import { itemColumns } from "lib/columns/columnsList";
import PageHeader from "lib/pages/pageHeader";
import { Responsive } from "lib/styles";
import { Table } from "lib/styles/tableStyle";
import styled from "styled-components";
import { testItemData } from "types/data.test";

const GoodsItemBlock = styled(Responsive)``;

type itemProps = {
  itemList: any;
};

const GoodsItem = ({ itemList }: itemProps) => {
  return (
    <GoodsItemBlock>
      <PageHeader title="상품아이템 조회" />
      <Table
        columns={itemColumns}
        content={testItemData}
        pagenation
        url="/goods/group/item"
        moveKey="id"
        filter
      />
    </GoodsItemBlock>
  );
};

export default GoodsItem;
