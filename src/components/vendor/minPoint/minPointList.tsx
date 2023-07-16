import styled from "styled-components";
import { Button, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { response } from "types/globalTypes";
import { minPointColumns } from "lib/columns/columnsList";
import { NavigateFunction } from "react-router-dom";

const MinPointListBlock = styled(Responsive)``;

type MinPointProps = {
  minPointList: response;
  navigate: NavigateFunction;
  vendorId: string | undefined;
};

const MinPointList = ({ minPointList, navigate, vendorId }: MinPointProps) => {
  return (
    <MinPointListBlock>
      <PageHeader
        title="최소 적립금 조회"
        extra={
          <Button
            onClick={() => {
              if (typeof vendorId === "string") {
                navigate(`register`);
              }
            }}
          >
            최소 적립금 등록
          </Button>
        }
      />
      <Table
        columns={minPointColumns}
        content={minPointList.data}
        url={`/vendor/minPoint/${
          typeof vendorId === "string" && vendorId
        }/detail`}
        moveKey="id"
        pagenation
      />
    </MinPointListBlock>
  );
};

export default MinPointList;
