import styled from "styled-components";
import { BreadCrumb, Button, Responsive } from "lib/styles";
import { Table } from "lib/styles/tableStyle";
import PageHeader from "lib/pages/pageHeader";
import { useNavigate } from "react-router-dom";
import { colorColumns } from "lib/columns/columnsList";
import { response } from "types/globalTypes";

const ColorListBlock = styled(Responsive)``;

type colorListProps = {
  countColor: response;
  colorList: response;
  colorPageNum: string | undefined;
};

const ColorList = ({ countColor, colorList, colorPageNum }: colorListProps) => {
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
                  url: "",
                },
              ]}
            />
          }
          extra={
            <Button
              onClick={() => navigate(`/admin/color/${colorPageNum}/register`)}
            >
              색상코드 등록
            </Button>
          }
        />
      </ColorListBlock>
      <ColorListBlock>
        <Table
          columns={colorColumns}
          content={colorList.data}
          url={`/admin/color/${colorPageNum}/detail`}
          nonPageUrl={`/admin/color/${colorPageNum}/detail`}
          moveKey={["info", "name"]}
          pagenation
          pageCount={countColor.data}
        />
      </ColorListBlock>
    </>
  );
};

export default ColorList;
