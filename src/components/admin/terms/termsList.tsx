import styled from "styled-components";
import { BreadCrumb, Button, Responsive } from "lib/styles";
import { Table } from "lib/styles/tableStyle";
import PageHeader from "lib/pages/pageHeader";
import { useNavigate } from "react-router-dom";
import { response } from "types/globalTypes";
import { ColumnsType } from "lib/columns/columnsList";

const TermsListBlock = styled(Responsive)``;

type termsListProps = {
  termsList: response;
  termsColumns: ColumnsType[];
};

const TermsList = ({ termsList, termsColumns }: termsListProps) => {
  const navigate = useNavigate();
  return (
    <>
      <TermsListBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "약관 조회",
                  url: "/admin/terms",
                },
              ]}
            />
          }
          extra={
            <Button onClick={() => navigate("/admin/terms/register")}>
              약관 등록
            </Button>
          }
        />
      </TermsListBlock>
      <TermsListBlock>
        <Table
          columns={termsColumns}
          content={termsList.data}
          url="/admin/terms/detail"
          moveKey={["base", "id"]}
        />
      </TermsListBlock>
    </>
  );
};

export default TermsList;
