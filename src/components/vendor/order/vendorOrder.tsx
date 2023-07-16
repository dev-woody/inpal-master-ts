import { BreadCrumb, Responsive, StyledSelect } from "lib/styles";
import styled from "styled-components";
import { Table } from "lib/styles/tableStyle";
import { vendorOrderColumns } from "lib/columns/columnsList";
import PageHeader from "lib/pages/pageHeader";
import { testVendorOrderData } from "types/data.test";

const VendorOrderBlock = styled(Responsive)``;

const VendorOrder = ({ orderList }: { orderList: any }) => {
  return (
    <>
      <VendorOrderBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "판매사 주문 관리 /",
                  url: "/vendor/list",
                },
                {
                  name: "상세정보",
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
          content={testVendorOrderData}
          url="/vendor/order"
          moveKey="id"
          pagenation
          filter
          filterInput={
            <StyledSelect
              placeholder="주문 상태별"
              optionList={[]}
              actions={function () {}}
            />
          }
        />
      </VendorOrderBlock>
    </>
  );
};

export default VendorOrder;
