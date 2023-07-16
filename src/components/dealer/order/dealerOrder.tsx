import { BreadCrumb, Responsive, StyledSelect } from "lib/styles";
import styled from "styled-components";
import { Table } from "lib/styles/tableStyle";
import { dealerOrderColumns } from "lib/columns/columnsList";
import PageHeader from "lib/pages/pageHeader";
import { testDealerOrderData } from "types/data.test";
import { response } from "types/globalTypes";

const DealerOrderBlock = styled(Responsive)``;

type dealerOrderProps = {
  orderList: response;
  id: string | undefined;
};

const DealerOrder = ({ orderList, id }: dealerOrderProps) => {
  return (
    <>
      <DealerOrderBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "시공업자 주문 관리",
                  url: `/dealer/order/orderByDealerId/${id}`,
                },
              ]}
            />
          }
        />
      </DealerOrderBlock>
      <DealerOrderBlock>
        <Table
          columns={dealerOrderColumns}
          content={testDealerOrderData}
          url="/dealer/order"
          moveKey="id"
          pagenation
          filter
        />
      </DealerOrderBlock>
    </>
  );
};

export default DealerOrder;
