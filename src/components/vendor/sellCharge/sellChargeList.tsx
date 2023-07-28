import styled from "styled-components";
import { Button, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { response } from "types/globalTypes";
import { ColumnsType } from "lib/columns/columnsList";
import { NavigateFunction } from "react-router-dom";

const SellChargeListBlock = styled(Responsive)``;

type SellChargeProps = {
  sellChargeList: any;
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
  return (
    <SellChargeListBlock>
      <PageHeader
        title="판매 수수료 조회"
        extra={
          <Button
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
        content={sellChargeList}
        url={`/vendor/sellCharge/${
          typeof vendorId === "string" && vendorId
        }/detail`}
        // moveKey="id"
        pagenation
      />
    </SellChargeListBlock>
  );
};

export default SellChargeList;
