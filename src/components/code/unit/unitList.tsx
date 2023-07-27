import styled from "styled-components";
import {
  BreadCrumb,
  Button,
  Responsive,
  StyledSelect,
  Table,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { response } from "types/globalTypes";
import { NavigateFunction } from "react-router-dom";
import { ColumnsType } from "lib/columns/columnsList";

type UnitProps = {
  productList: response;
  unitList: response;
  unitColumns: ColumnsType[];
  onSelect: (id: string) => void;
  navigate: NavigateFunction;
};

const UnitListBlock = styled(Responsive)``;

const UnitList = ({
  productList,
  unitList,
  unitColumns,
  onSelect,
  navigate,
}: UnitProps) => {
  return (
    <>
      <UnitListBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "단위 관리",
                  url: "/code/unit",
                },
              ]}
            />
          }
          extra={
            <Button onClick={() => navigate("register")}>단위 등록</Button>
          }
        />
      </UnitListBlock>
      <UnitListBlock>
        <Table
          columns={unitColumns}
          content={unitList.data}
          url="/code/unit/detail"
          moveKey={["base", "id"]}
          pagenation
          filter
          filterInput={
            <>
              <StyledSelect
                placeholder="품목 선택"
                optionList={productList}
                actions={onSelect}
              />
              {/* <StyledSelect
                placeholder="사용 상태"
                optionList={[]}
                actions={function () {}}
              /> */}
            </>
          }
        />
      </UnitListBlock>
    </>
  );
};

export default UnitList;
