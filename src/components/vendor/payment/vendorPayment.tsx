import PageHeader from "lib/pages/pageHeader";
import { BreadCrumb, Responsive } from "lib/styles";
import { Table } from "lib/styles/tableStyle";
import styled from "styled-components";
import { vendorPaymentColumns } from "lib/columns/columnsList";

type VendorPayment = {
  vendorPaymentInfo: any;
  vendorId: string | undefined;
};

const VendorPaymentBlock = styled(Responsive)``;

const VendorPayment = ({ vendorPaymentInfo, vendorId }: VendorPayment) => {
  return (
    <>
      <VendorPaymentBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "판매사 정산 관리",
                  url: `/vendor/payment/${vendorId}`,
                },
              ]}
            />
          }
        />
      </VendorPaymentBlock>
      <VendorPaymentBlock>
        <Table
          columns={vendorPaymentColumns}
          content={vendorPaymentInfo}
          url="/vendor/payment"
          moveKey="name"
          pagenation
        />
      </VendorPaymentBlock>
    </>
  );
};

export default VendorPayment;
