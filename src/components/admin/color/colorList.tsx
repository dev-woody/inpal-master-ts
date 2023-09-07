import styled from "styled-components";
import { BreadCrumb, Button, Responsive } from "lib/styles";
import { Table } from "lib/styles/tableStyle";
import PageHeader from "lib/pages/pageHeader";
import { useNavigate, useSearchParams } from "react-router-dom";
import { colorColumns } from "lib/columns/columnsList";
import { response } from "types/globalTypes";

const ColorListBlock = styled(Responsive)``;

type colorListProps = {
  countColor: response;
  colorList: response;
};

const ColorList = ({ countColor, colorList }: colorListProps) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const newPageNum = Number(atob(searchParams.get("n") || btoa("0")));
  const { n, d } = JSON.parse(
    sessionStorage.getItem("colorPageInfo") || "{}"
  );
  return (
    <>
      <ColorListBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "색상 관리",
                  url: `/admin/color?n=${n}&d=${d}`,
                },
              ]}
            />
          }
          extra={
            <Button
              onClick={() => {
                navigate(`/admin/color/register`);
              }}
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
          url={`/admin/color/detail`}
          searchParams={searchParams}
          setSearchParams={(page: number) =>
            setSearchParams({
              n: btoa(String(newPageNum + page)),
              d: d,
            })
          }
          moveKey={["info", "name"]}
          pagenation
          pageCount={countColor.data}
        />
      </ColorListBlock>
    </>
  );
};

export default ColorList;
