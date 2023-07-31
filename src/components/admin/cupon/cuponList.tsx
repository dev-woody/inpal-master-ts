import styled from "styled-components";
import { BreadCrumb, Button, Responsive } from "lib/styles";
import { Table } from "lib/styles/tableStyle";
import PageHeader from "lib/pages/pageHeader";
import { useNavigate } from "react-router-dom";
import { response } from "types/globalTypes";
import { ColumnsType } from "lib/columns/columnsList";

const CuponListBlock = styled(Responsive)``;

type cuponListProps = {
  cuponList: response;
  cuponColumns: ColumnsType[];
};

const CuponList = ({ cuponList, cuponColumns }: cuponListProps) => {
  const navigate = useNavigate();
  return (
    <>
      <CuponListBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "쿠폰 조회",
                  url: "/admin/cupon",
                },
              ]}
            />
          }
          extra={
            <Button onClick={() => navigate("/admin/cupon/register")}>
              쿠폰 등록
            </Button>
          }
        />
      </CuponListBlock>
      <CuponListBlock>
        <Table
          columns={cuponColumns}
          content={cuponList.data}
          url="/admin/cupon/detail"
          moveKey={["base", "id"]}
          pagenation
          filter
        />
      </CuponListBlock>
    </>
  );
};

export default CuponList;
