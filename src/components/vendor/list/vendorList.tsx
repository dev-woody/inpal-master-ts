import { vendorAllListColumns } from "lib/columns/columnsList";
import PageHeader from "lib/pages/pageHeader";
import { BreadCrumb, Responsive } from "lib/styles";
import { Table } from "lib/styles/tableStyle";
import styled from "styled-components";
import { response } from "types/globalTypes";

const VendorBlockList = styled(Responsive)``;

type VendorListType = {
  countVendor: response;
  vendorList: response;
  vendorPageNum: string | undefined;
};

const VendorList = ({
  countVendor,
  vendorList,
  vendorPageNum,
}: VendorListType) => {
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
          url={`/vendor/list/${vendorPageNum}`}
          nonPageUrl={`/vendor/list`}
          moveKey={["base", "id"]}
          pagenation
          pageCount={countVendor.data}
          // filter
        />
      </VendorBlockList>
    </>
  );
};

export default VendorList;
