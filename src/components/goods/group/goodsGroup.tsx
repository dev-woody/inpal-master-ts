import { ColumnsType } from "lib/columns/columnsList";
import PageHeader from "lib/pages/pageHeader";
import { BreadCrumb, Responsive, StyledSelect } from "lib/styles";
import { Table } from "lib/styles/tableStyle";
import { useSearchParams } from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const newPageNum = Number(searchParams.get("pageNum") || "0");
  const { pageNum, isDesc } = JSON.parse(
    sessionStorage.getItem("groupPageInfo") || "{}"
  );
  return (
    <>
      <GoodsGroupBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "상품그룹 관리",
                  url: `/goods/group?pageNum=${pageNum}&isDesc=${isDesc}`,
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
          url={`/goods/group`}
          searchParams={searchParams}
          setSearchParams={(page: number) =>
            setSearchParams({
              pageNum: String(newPageNum + page),
              isDesc: isDesc,
            })
          }
          moveKey={["base", "id"]}
          pagenation
          pageCount={countGoodsGroup.data}
        />
      </GoodsGroupBlock>
    </>
  );
};

export default GoodsGroup;
