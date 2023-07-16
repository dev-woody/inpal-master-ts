import { Description, DescriptionContent } from "lib/styles/descriptionStyles";
import PageHeader from "lib/pages/pageHeader";
import { BreadCrumb, Button, Responsive } from "lib/styles";
import { StyledSelect } from "lib/styles";
import { changeDays, changeSellStatus } from "lib/functions/changeInput";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { sellStatusOption } from "lib/columns/statusColumns";
import { testOptionData } from "types/data.test";

const GoodOptionDetailBlock = styled(Responsive)``;

type optionDetailProps = {
  onSetSellStatus: (data: any) => void;
  id: string | undefined;
};

const GoodOptionDetail = ({ onSetSellStatus, id }: optionDetailProps) => {
  const data = testOptionData[0];
  const { register, handleSubmit, setValue } = useForm();
  return (
    <>
      <GoodOptionDetailBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "상품그룹관리 /",
                  url: "/goods",
                },
                {
                  name: "상세정보 및 수정 /",
                  url: `/goods/detail/${id}`,
                },
                {
                  name: "옵션 상세정보",
                  url: "",
                },
              ]}
            />
          }
        />
      </GoodOptionDetailBlock>
      <GoodOptionDetailBlock>
        <form onSubmit={handleSubmit((data) => onSetSellStatus({ data }))}>
          <Description>
            <DescriptionContent label="이름" content={data?.name} />
            <DescriptionContent label="사양" content={data?.spec} />
            <DescriptionContent
              label="생성일"
              content={changeDays(data?.createdAt)}
            />
            <DescriptionContent
              label="수정일"
              content={changeDays(data?.updatedAt)}
            />
            <DescriptionContent label="가격" content={data?.price} />
            <DescriptionContent label="재고" content={data?.stock} />
            <DescriptionContent label="판매량" content={data?.sellCount} />
            <DescriptionContent
              label="판매상태"
              content={
                <StyledSelect
                  placeholder={changeSellStatus(data?.sellStatus) || ""}
                  optionList={sellStatusOption}
                  label="status"
                  register={register}
                  setValue={setValue}
                />
              }
            />
          </Description>
          <Button type="submit" status="primary" needMarginTop>
            수정
          </Button>
        </form>
      </GoodOptionDetailBlock>
    </>
  );
};

export default GoodOptionDetail;
