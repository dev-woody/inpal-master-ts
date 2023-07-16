import { Description, DescriptionContent } from "lib/styles/descriptionStyles";
import PageHeader from "lib/pages/pageHeader";
import { Responsive } from "lib/styles";
import { StyledToggle } from "lib/styles/toggleStyle";
import styled from "styled-components";
import { testData } from "./goodSell";

const GoodSellDetailBlock = styled(Responsive)``;

const GoodSellDetail = () => {
  const data = testData[0];
  return (
    <GoodSellDetailBlock>
      <PageHeader title="디테일 조회" />
      <Description>
        <DescriptionContent label="코드" content={data.code} />
        <DescriptionContent label="이름" content={data.description} />
        <DescriptionContent
          label="판매상태"
          content={
            <StyledToggle
              data={data.sellStatus}
              openStatus="OPEN"
              action={() => console.log("변경")}
            />
          }
        />
      </Description>
    </GoodSellDetailBlock>
  );
};

export default GoodSellDetail;
