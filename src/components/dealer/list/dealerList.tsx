import { BreadCrumb, Responsive, StyledSelect } from "lib/styles";
import styled from "styled-components";
import { Table } from "lib/styles/tableStyle";
import { dealerAllListColumns } from "lib/columns/columnsList";
import PageHeader from "lib/pages/pageHeader";
import { response } from "types/globalTypes";

const DealerListBlock = styled(Responsive)``;

type DealerProps = {
  dealerList: response;
};

const DealerList = ({ dealerList }: DealerProps) => {
  return (
    <>
      <DealerListBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "시공업자 관리",
                  url: "/dealer/list",
                },
              ]}
            />
          }
        />
      </DealerListBlock>
      <DealerListBlock>
        <Table
          columns={dealerAllListColumns}
          content={dealerList.data}
          url="/dealer/list"
          moveKey={["base", "id"]}
          pagenation
          // filter
          // filterInput={
          //   <>
          //     <StyledSelect
          //       placeholder="대표 품목별"
          //       optionList={[]}
          //       actions={function () {}}
          //     />
          //     <StyledSelect
          //       placeholder="누적 금액별"
          //       optionList={[]}
          //       actions={function () {}}
          //     />
          //   </>
          // }
        />
      </DealerListBlock>
    </>
  );
};

export default DealerList;
