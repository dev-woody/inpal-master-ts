import styled from "styled-components";
import { BreadCrumb, Button, Responsive } from "lib/styles";
import { Table } from "lib/styles/tableStyle";
import PageHeader from "lib/pages/pageHeader";
import { useNavigate } from "react-router-dom";
import { colorColumns } from "lib/columns/columnsList";
import { response } from "types/globalTypes";

const ColorListBlock = styled(Responsive)``;

type colorListProps = {
  colorList: response;
};

const ColorList = ({ colorList }: colorListProps) => {
  const navigate = useNavigate();
  return (
    <>
      <ColorListBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "색상 관리",
                  url: "/admin/color",
                },
              ]}
            />
          }
          extra={
            <Button onClick={() => navigate("/admin/color/register")}>
              색상코드 등록
            </Button>
          }
        />
      </ColorListBlock>
      <ColorListBlock>
        <Table
          columns={colorColumns}
          content={colorList.data}
          url="/admin/color/detail"
          moveKey={["info", "name"]}
          pagenation
        />
      </ColorListBlock>
    </>
  );
};

export default ColorList;
