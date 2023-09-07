import { ColumnsType } from "lib/columns/columnsList";
import PageHeader from "lib/pages/pageHeader";
import { BreadCrumb, Responsive, StyledSelect } from "lib/styles";
import { Table } from "lib/styles/tableStyle";
import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { response } from "types/globalTypes";

const GoodsGroupBlock = styled(Responsive)``;

type groupProps = {
  countGoodsGroup: response;
  productList: response;
  goodsGroup: response;
  groupColumns: ColumnsType[];
};

const GoodsGroup = ({
  countGoodsGroup,
  productList,
  goodsGroup,
  groupColumns,
}: groupProps) => {
  const {id} = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const newPageNum = Number(atob(searchParams.get("n") || btoa("0")));
  const vendorInfo = JSON.parse(sessionStorage.getItem("vendorPageInfo") || "{}");
  const { n, d } = JSON.parse(
    sessionStorage.getItem("groupVendorPageInfo") || "{}"
  );

  return (
    <>
      <GoodsGroupBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "판매사 관리 /",
                  url: `/vendor/list?n=${vendorInfo.n}&d=${vendorInfo.d}`,
                },
                {
                  name: "상세정보 /",
                  url: `/vendor/list/${id}`,
                },
                {
                  name: "상품그룹 관리",
                  url: `/vendor/list/${id}/goods/group?n=${n}&d=${d}`,
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
          url={`/vendor/list/${id}/goods/group`}
          searchParams={searchParams}
          setSearchParams={(page: number) =>
            setSearchParams({
              n: btoa(String(newPageNum + page)),
              d: d,
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
