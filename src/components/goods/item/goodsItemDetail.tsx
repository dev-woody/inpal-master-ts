import { Description, DescriptionContent } from "lib/styles/descriptionStyles";
import PageHeader from "lib/pages/pageHeader";
import { BreadCrumb, Button, Responsive } from "lib/styles";
import { StyledSelect } from "lib/styles";
import styled from "styled-components";
import { testItemData } from "types/data.test";
import {
  changeDays,
  changeOpenStatus,
  changeSellStatus,
} from "lib/functions/changeInput";
import { useForm } from "react-hook-form";
import { sellStatusOption } from "lib/columns/statusColumns";
import { NavigateFunction } from "react-router-dom";
import { response } from "types/globalTypes";

const GoodsItemDetailBlock = styled(Responsive)``;

type itemDetailProps = {
  itemInfo: response;
  navigate: NavigateFunction;
  // onSetSellStatus: (data: any) => void;
  id: string | undefined;
};

const GoodsItemDetail = ({
  itemInfo,
  navigate,
  // onSetSellStatus,
  id,
}: itemDetailProps) => {
  const data = itemInfo.data;
  const { register, handleSubmit, setValue } = useForm();
  return (
    <>
      <GoodsItemDetailBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "상품그룹 관리 /",
                  url: "/goods/group",
                },
                {
                  name: "상세정보 및 수정 /",
                  url: `/goods/group/${id}`,
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
        {/* <form onSubmit={handleSubmit((data) => onSetSellStatus({ data }))}> */}
        <Description>
          <DescriptionContent label="코드" content={data?.info.code} />
          <DescriptionContent
            label="아이템 명"
            content={data?.info.basic.info.name}
          />
          {/* <DescriptionContent label="적립포인트" content={data?.point} />
          <DescriptionContent label="재고" content={data?.stock} />
          <DescriptionContent label="판매량" content={data?.sellCount} />
          <DescriptionContent label="배송료" content={data?.deliveryBasicFee} />
          <DescriptionContent
            label="무료배송 조건"
            content={data?.deliveryFreeCondition + "원 이상 주문"}
          /> */}
          <DescriptionContent
            label="생성일"
            content={changeDays(data?.base.createdAt)}
          />
          <DescriptionContent
            label="수정일"
            content={changeDays(data?.base.updatedAt)}
          />
          <DescriptionContent
            label="판매상태"
            content={
              changeSellStatus(data?.info.sellStatus)
              // <StyledSelect
              //   placeholder={changeSellStatus(data?.sellStatus) || ""}
              //   optionList={sellStatusOption}
              //   label="status"
              //   register={register}
              //   setValue={setValue}
              // />
            }
          />
        </Description>
        <Button
          needMarginTop
          withInput
          onClick={() => navigate(`/goods/group/${id}`)}
        >
          뒤로가기
        </Button>
        {/* <Button type="submit" status="primary" needMarginTop>
            수정
          </Button>
        </form> */}
      </GoodsItemDetailBlock>
    </>
  );
};

export default GoodsItemDetail;
