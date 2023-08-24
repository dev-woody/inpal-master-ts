import { vendorAllListColumns } from "lib/columns/columnsList";
import PageHeader from "lib/pages/pageHeader";
import { BreadCrumb, Responsive } from "lib/styles";
import { Table } from "lib/styles/tableStyle";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { response } from "types/globalTypes";

const VendorBlockList = styled(Responsive)``;

type VendorListType = {
  countVendor: response;
  vendorList: response;
};

const VendorList = ({ countVendor, vendorList }: VendorListType) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const newPageNum = Number(searchParams.get("pageNum") || "0");
  const { pageNum, isDesc } = JSON.parse(
    sessionStorage.getItem("vendorPageInfo") || "{}"
  );
  return (
    <>
      <VendorBlockList>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "판매사 관리",
                  url: `?pageNum=${pageNum}&isDesc=${isDesc}`,
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
          url={`/vendor/list`}
          searchParams={searchParams}
          setSearchParams={(page: number) =>
            setSearchParams({
              pageNum: String(newPageNum + page),
              isDesc: isDesc,
            })
          }
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
