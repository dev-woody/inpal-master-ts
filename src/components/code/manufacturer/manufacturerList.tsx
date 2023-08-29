import { Fragment } from "react";
import styled from "styled-components";
import PageHeader from "lib/pages/pageHeader";
import { BreadCrumb, Button, Responsive } from "lib/styles";
import { Table } from "lib/styles/tableStyle";
import { StyledSelect } from "lib/styles/selectStyle";
import { useNavigate } from "react-router-dom";
import { ColumnsType } from "lib/columns/columnsList";
import { response } from "types/globalTypes";

const ManufacturerListBlock = styled(Responsive)`
  z-index: 99;
`;

type manufacturerListProps = {
  manufacturerList: response;
  productList: response;
  manufacturerListColumns: ColumnsType[];
  onSelect: (id: string) => void;
};

const ManufacturerList = ({
  manufacturerList,
  productList,
  manufacturerListColumns,
  onSelect,
}: manufacturerListProps) => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <ManufacturerListBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "제조사 관리",
                  url: "/code/manufacturer",
                },
              ]}
            />
          }
          extra={
            <Button onClick={() => navigate("register")}>제조사 등록</Button>
          }
        />
      </ManufacturerListBlock>
      <ManufacturerListBlock>
        <Table
          columns={manufacturerListColumns}
          content={manufacturerList?.data}
          url="/code/manufacturer/detail"
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
      </ManufacturerListBlock>
      {/* <MasterAuthority content={<ManufacturerAddContainer />} /> */}
    </Fragment>
  );
};

export default ManufacturerList;
