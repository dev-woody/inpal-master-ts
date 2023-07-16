import { Description, DescriptionContent } from "lib/styles/descriptionStyles";
import PageHeader from "lib/pages/pageHeader";
import { BreadCrumb, Button, Responsive } from "lib/styles";
import { StyledSelect } from "lib/styles";
import styled from "styled-components";
import { testItemData } from "types/data.test";
import { changeDays, changeSellStatus } from "lib/functions/changeInput";
import { useForm } from "react-hook-form";
import { sellStatusOption } from "lib/columns/statusColumns";

const GoodsItemDetailBlock = styled(Responsive)``;

type itemDetailProps = {
  itemInfo: any;
  onSetSellStatus: (data: any) => void;
  id: string | undefined;
};

const GoodsItemDetail = ({
  itemInfo,
  onSetSellStatus,
  id,
}: itemDetailProps) => {
  const data = testItemData[0];
  const { register, handleSubmit, setValue } = useForm();
  return (
    <>
      <GoodsItemDetailBlock>
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
                  name: "아이템 상세정보",
                  url: "",
                },
              ]}
            />
          }
        />
      </GoodsItemDetailBlock>
      <GoodsItemDetailBlock>
        <form onSubmit={handleSubmit((data) => onSetSellStatus({ data }))}>
          <Description>
            <DescriptionContent label="코드" content={data?.code} />
            <DescriptionContent label="아이템 명" content={data?.name} />
            <DescriptionContent label="가격" content={data?.price} />
            <DescriptionContent
              label="할인 적용 가격"
              content={data?.salePrice}
            />
            {/* <DescriptionContent
            label="할인금액"
            content={data?.saleDifferencePrice}
          /> */}
            {/* <DescriptionContent label="할인율" content={data?.saleRatio} /> */}
            <DescriptionContent
              label="포인트 적립율"
              content={data?.pointRatio}
            />
            <DescriptionContent label="적립포인트" content={data?.point} />
            <DescriptionContent label="재고" content={data?.stock} />
            <DescriptionContent label="판매량" content={data?.sellCount} />
            <DescriptionContent
              label="배송료"
              content={data?.deliveryBasicFee}
            />
            <DescriptionContent
              label="무료배송 조건"
              content={data?.deliveryFreeCondition + "원 이상 주문"}
            />
            <DescriptionContent
              label="생성일"
              content={changeDays(data?.createdAt)}
            />
            <DescriptionContent
              label="수정일"
              content={changeDays(data?.updatedAt)}
            />
            <DescriptionContent
              label="디테일 이미지"
              content={<Button type="button">상세보기</Button>}
            />
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
      </GoodsItemDetailBlock>
    </>
  );
};

export default GoodsItemDetail;
