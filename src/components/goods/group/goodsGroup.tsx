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
  productList: response;
  goodsGroup: response;
  groupColumns: ColumnsType[];
  onSelect: (id: string) => void;
};

const GoodsGroup = ({
  countGoodsGroup,
  productList,
  goodsGroup,
  groupColumns,
  onSelect,
}: groupProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const newPageNum = Number(atob(searchParams.get("n") || btoa("0")));
  const { n, d, p } = JSON.parse(
    sessionStorage.getItem("groupPageInfo") || "{}"
  );
  const newProductList = productList?.data?.map((item: any) => {
    return { name: item.info.nameKr, id: item.base.id };
  });

  newProductList?.unshift({
    name: "전체조회",
    id: "ALL",
  });
  return (
    <>
      <GoodsGroupBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "상품그룹 관리",
                  url: `/goods/group?n=${n}&d=${d}&p=${p}`,
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
              n: btoa(String(newPageNum + page)),
              d: d,
              p: p,
            })
          }
          moveKey={["base", "id"]}
          pagenation
          pageCount={countGoodsGroup.data}
          filter
          filterInput={
            <StyledSelect
              placeholder="품목별 조회"
              optionList={newProductList}
              actions={(id: string) => onSelect(id)}
            />
          }
        />
      </GoodsGroupBlock>
    </>
  );
};

export default GoodsGroup;
