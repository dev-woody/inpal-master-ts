import { ColumnsType } from "lib/columns/columnsList";
import PageHeader from "lib/pages/pageHeader";
import { BreadCrumb, Responsive, StyledSelect } from "lib/styles";
import { Table } from "lib/styles/tableStyle";
import styled from "styled-components";
import { response } from "types/globalTypes";

const GoodsGroupBlock = styled(Responsive)``;

type groupProps = {
  goodsGroup: response;
  groupColumns: ColumnsType[];
  onSearch: (data: any) => void;
};

const GoodsGroup = ({ goodsGroup, groupColumns, onSearch }: groupProps) => {
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
          pagenation
          url="/goods/group"
          moveKey="id"
          filter
          filterInput={
            <>
              <StyledSelect
                placeholder="품목 선택"
                optionList={[]}
                actions={function () {}}
              />
              <StyledSelect
                placeholder="제조사 선택"
                optionList={[]}
                actions={function () {}}
              />
              {/* <StyledSelect
                placeholder="사용 상태"
                optionList={[]}
                actions={function () {}}
              /> */}
            </>
          }
        />
      </GoodsGroupBlock>
    </>
  );
};

export default GoodsGroup;
