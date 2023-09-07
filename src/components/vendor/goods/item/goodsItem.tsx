import { itemColumns } from "lib/columns/columnsList";
import PageHeader from "lib/pages/pageHeader";
import { Responsive } from "lib/styles";
import { Table } from "lib/styles/tableStyle";
import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { response } from "types/globalTypes";

const GoodsItemBlock = styled(Responsive)``;

type itemProps = {
  itemList: response;
  countGoodsItem: response;
};

const GoodsItem = ({ itemList, countGoodsItem }: itemProps) => {
  const { id, groupId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const newPageNum = Number(atob(searchParams.get("n") || btoa("0")));
  const { d } = JSON.parse(sessionStorage.getItem("itemPageInfo") || "{}");
  return (
    <GoodsItemBlock>
      <PageHeader title="상품아이템 조회" />
      <Table
        columns={itemColumns}
        content={itemList.data}
        url={`/vendor/list/${id}/goods/group/${groupId}/item`}
        searchParams={searchParams}
        setSearchParams={(page: number) =>
          setSearchParams({
            n: btoa(String(newPageNum + page)),
            d: d,
          })
        }
        moveKey={["base", "id"]}
        pagenation
        pageCount={countGoodsItem.data}
      />
    </GoodsItemBlock>
  );
};

export default GoodsItem;
