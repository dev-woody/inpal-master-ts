import { optionColumns } from "lib/columns/columnsList";
import PageHeader from "lib/pages/pageHeader";
import { Responsive } from "lib/styles";
import { Table } from "lib/styles/tableStyle";
import styled from "styled-components";
import { testOptionData } from "types/data.test";

const GoodOptionBlock = styled(Responsive)``;

const GoodOption = () => {
  return (
    <GoodOptionBlock>
      <PageHeader title="옵션 조회" />
      <Table
        columns={optionColumns}
        content={testOptionData}
        pagenation
        url="/goods/group/option"
        moveKey="id"
        filter
      />
    </GoodOptionBlock>
  );
};

export default GoodOption;
