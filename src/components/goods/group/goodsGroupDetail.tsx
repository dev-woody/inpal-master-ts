import { Fragment } from "react";
import { Description, DescriptionContent } from "lib/styles/descriptionStyles";
import PageHeader from "lib/pages/pageHeader";
import { BreadCrumb, Button, Responsive, StyledSelect } from "lib/styles";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { changeDays, changeOpenStatus } from "lib/functions/changeInput";
import { response } from "types/globalTypes";
import GoodsItemContainer from "containers/goods/item/goodsItemContainer";

const GoodsGroupDetailBlock = styled(Responsive)``;

type groupDetailProps = {
  groupDetail: response;
};

const GoodsGroupDetail = ({ groupDetail }: groupDetailProps) => {
  const data = groupDetail?.data;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm();
  return (
    <Fragment>
      <GoodsGroupDetailBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "상품그룹 관리 /",
                  url: "/goods/group",
                },
                {
                  name: "상세정보",
                  url: "",
                },
              ]}
            />
          }
        />
      </GoodsGroupDetailBlock>
      <GoodsGroupDetailBlock>
        {/* <form onSubmit={handleSubmit((data) => onSetSellStatus({ data }))}> */}
        <Description>
          <DescriptionContent label="코드" content={data?.info.code} />
          <DescriptionContent
            label="이름"
            content={data?.info.basic.info.name}
          />
          <DescriptionContent
            label="설명"
            content={data?.info.basic.info.description}
          />
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
              changeOpenStatus(data?.info.openStatus)
              // <StyledSelect
              //   placeholder={changeOpenStatus(data?.info.openStatus) || ""}
              //   optionList={sellStatusOption}
              //   label="status"
              //   register={register}
              //   setValue={setValue}
              // />
            }
          />
        </Description>
        {/* <Button
            type="submit"
            status="primary"
            disabled={isSubmitting}
            needMarginTop
            withInput
          >
            수정
          </Button>
        </form> */}
      </GoodsGroupDetailBlock>
      {/* <OptionIndex /> */}
      <GoodsItemContainer />
    </Fragment>
  );
};

export default GoodsGroupDetail;
