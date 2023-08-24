import styled from "styled-components";
import { BreadCrumb, Button, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { response } from "types/globalTypes";
import { ColumnsType } from "lib/columns/columnsList";
import { NavigateFunction } from "react-router-dom";

const SellChargeListBlock = styled(Responsive)``;

type SellChargeProps = {
  sellChargeList: response;
  sellChargeColumns: ColumnsType[];
  navigate: NavigateFunction;
  vendorId: string | undefined;
};

const SellChargeList = ({
  sellChargeList,
  sellChargeColumns,
  navigate,
  vendorId,
}: SellChargeProps) => {
  const { pageNum, isDesc } = JSON.parse(
    sessionStorage.getItem("vendorPageInfo") || "{}"
  );
  return (
    <>
      <SellChargeListBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "판매사 관리 /",
                  url: `/vendor/list?pageNum=${pageNum}&isDesc=${isDesc}`,
                },
                {
                  name: "상세정보 /",
                  url: `/vendor/list/${vendorId}`,
                },
                {
                  name: "판매 수수료",
                  url: ``,
                },
              ]}
            />
          }
        />
      </SellChargeListBlock>
      <SellChargeListBlock>
        <PageHeader
          title="판매 수수료 조회"
          extra={
            <Button
              type="button"
              onClick={() => {
                if (typeof vendorId === "string") {
                  navigate(`register`);
                }
              }}
            >
              판매 수수료 등록
            </Button>
          }
        />
        <Table
          columns={sellChargeColumns}
          content={sellChargeList.data}
          url={`/vendor/list/${
            typeof vendorId === "string" && vendorId
          }/sellFees/detail`}
          moveKey={["base", "id"]}
          // pagenation
        />
      </SellChargeListBlock>
    </>
  );
};

export default SellChargeList;
