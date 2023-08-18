import { ColumnsType } from "lib/columns/columnsList";
import PageHeader from "lib/pages/pageHeader";
import { BreadCrumb, Responsive, StyledSelect } from "lib/styles";
import { Table } from "lib/styles/tableStyle";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { response } from "types/globalTypes";

const GoodsGroupBlock = styled(Responsive)``;

type groupProps = {
  countGoodsGroup: response;
  goodsGroup: response;
  groupColumns: ColumnsType[];
};

const GoodsGroup = ({
  countGoodsGroup,
  goodsGroup,
  groupColumns,
}: groupProps) => {
  const { goodsGroupPageNum } = useParams();
  return (
    <>
      <GoodsGroupBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "상품그룹 관리",
                  url: "/goods/group",
                },
              ]}
            />
          }
        />
      </GoodsGroupBlock>
      <GoodsGroupBlock>
        <Table
          columns={groupColumns}
          content={goodsGroup?.data}
          url={`/goods/group/${goodsGroupPageNum}`}
          nonPageUrl={`/goods/group`}
          moveKey={["base", "id"]}
          pagenation
          pageCount={countGoodsGroup.data}
        />
      </GoodsGroupBlock>
    </>
  );
};

export default GoodsGroup;
