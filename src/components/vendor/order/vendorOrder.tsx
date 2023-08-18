import { BreadCrumb, Responsive, StyledSelect } from "lib/styles";
import styled from "styled-components";
import { Table } from "lib/styles/tableStyle";
import { vendorOrderColumns } from "lib/columns/columnsList";
import PageHeader from "lib/pages/pageHeader";
import { response } from "types/globalTypes";

const VendorOrderBlock = styled(Responsive)``;

type VendorOrderType = {
  countOrder: response;
  orderList: response;
  vendorPageNum: string | undefined;
  id: string | undefined;
  orderPageNum: string | undefined;
};

const VendorOrder = ({
  countOrder,
  orderList,
  vendorPageNum,
  id,
  orderPageNum,
}: VendorOrderType) => {
  return (
    <>
      <VendorOrderBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "판매사 관리 /",
                  url: `/vendor/list/${vendorPageNum}`,
                },
                {
                  name: "상세정보 /",
                  url: `/vendor/list/${vendorPageNum}/${id}`,
                },
                {
                  name: "판매사 주문 관리",
                  url: "",
                },
              ]}
            />
          }
        />
      </VendorOrderBlock>
      <VendorOrderBlock>
        <Table
          columns={vendorOrderColumns}
          content={orderList.data}
          url={`/vendor/list/${vendorPageNum}/order/${id}/${orderPageNum}`}
          nonPageUrl={`/vendor/list/${vendorPageNum}/order/${id}`}
          moveKey={["base", "id"]}
          pagenation
          pageCount={countOrder.data}
          // filter
          // filterInput={
          //   <StyledSelect
          //     placeholder="주문 상태별"
          //     optionList={[]}
          //     actions={function () {}}
          //   />
          // }
        />
      </VendorOrderBlock>
    </>
  );
};

export default VendorOrder;
