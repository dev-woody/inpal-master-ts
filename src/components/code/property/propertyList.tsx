import { Fragment } from "react";
import styled from "styled-components";
import PageHeader from "lib/pages/pageHeader";
import { BreadCrumb, Button, Responsive } from "lib/styles";
import { Table } from "lib/styles/tableStyle";
import { StyledSelect } from "lib/styles/selectStyle";
import { useNavigate } from "react-router-dom";
import { ColumnsType } from "lib/columns/columnsList";
import { response } from "types/globalTypes";

const PropertyListBlock = styled(Responsive)`
  z-index: 99;
`;

type propertyListProps = {
  propertyList: response;
  productList: response;
  propertyListColumns: ColumnsType[];
  onSelect: (id: string) => void;
};

const PropertyList = ({
  propertyList,
  productList,
  propertyListColumns,
  onSelect,
}: propertyListProps) => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <PropertyListBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "상품속성 관리",
                  url: "/code/property",
                },
              ]}
            />
          }
          extra={
            <Button onClick={() => navigate("register")}>상품속성 등록</Button>
          }
        />
      </PropertyListBlock>
      <PropertyListBlock>
        <Table
          columns={propertyListColumns}
          content={propertyList.data}
          url="/code/property/detail"
          moveKey={["base", "id"]}
          // pagenation
          filter
          filterInput={
            <>
              <StyledSelect
                placeholder="품목 선택"
                optionList={productList.data}
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
      </PropertyListBlock>
      {/* <MasterAuthority content={<PropertyAddContainer />} /> */}
    </Fragment>
  );
};

export default PropertyList;
