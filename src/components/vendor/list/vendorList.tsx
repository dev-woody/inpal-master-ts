import { vendorAllListColumns } from "lib/columns/columnsList";
import PageHeader from "lib/pages/pageHeader";
import { BreadCrumb, Responsive } from "lib/styles";
import { Table } from "lib/styles/tableStyle";
import styled from "styled-components";
import { response } from "types/globalTypes";

const VendorBlockList = styled(Responsive)``;

type VendorListType = {
  vendorList: response;
};

const VendorList = ({ vendorList }: VendorListType) => {
  return (
    <>
      <VendorBlockList>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "판매사 관리",
                  url: "/vendor/list",
                },
              ]}
            />
          }
        />
      </VendorBlockList>
      <VendorBlockList>
        <Table
          columns={vendorAllListColumns}
          content={vendorList.data}
          url="/vendor/list"
          moveKey={["base", "id"]}
          pagenation
          // filter
        />
      </VendorBlockList>
    </>
  );
};

export default VendorList;
