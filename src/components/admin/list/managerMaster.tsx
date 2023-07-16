import { Fragment } from "react";
import { BreadCrumb, Button, Responsive, ResponsiveFlex } from "lib/styles";
import styled from "styled-components";
import { Table } from "lib/styles/tableStyle";
import { masterAllListColumns } from "lib/columns/columnsList";
import PageHeader from "lib/pages/pageHeader";
import { useNavigate } from "react-router-dom";
import { response, userType } from "types/globalTypes";

const ManagerBlock = styled(Responsive)``;

type masterProps = {
  masterList: response;
  user: userType;
};

const ManagerMaster = ({ masterList, user }: masterProps) => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <ManagerBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "마스터 조회",
                  url: "/admin/master",
                },
              ]}
            />
          }
          extra={
            user?.isTopLevel && (
              <Button onClick={() => navigate("/admin/master/register")}>
                관리자 추가
              </Button>
            )
          }
        />
      </ManagerBlock>
      <ManagerBlock>
        <Table
          columns={masterAllListColumns}
          content={masterList.data}
          url="/admin/master/detail"
          moveKey={["info", "signInfo", "userId"]}
          pagenation
        />
      </ManagerBlock>
    </Fragment>
  );
};

export default ManagerMaster;
