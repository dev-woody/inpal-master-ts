import { Fragment } from "react";
import { Description, DescriptionContent } from "lib/styles/descriptionStyles";
import PageHeader from "lib/pages/pageHeader";
import { BreadCrumb, Button, Responsive, StyledSelect } from "lib/styles";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { changeDays, changeSellStatus } from "lib/functions/changeInput";
import ItemIndex from "../item";
import OptionIndex from "../option";
import { sellStatusOption } from "lib/columns/statusColumns";
import { response } from "types/globalTypes";

const GoodsGroupDetailBlock = styled(Responsive)``;

type groupDetailProps = {
  groupDetail: response;
  onSetSellStatus: (data: any) => void;
};

const GoodsGroupDetail = ({
  groupDetail,
  onSetSellStatus,
}: groupDetailProps) => {
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
        <form onSubmit={handleSubmit((data) => onSetSellStatus({ data }))}>
          <Description>
            <DescriptionContent label="코드" content={data?.code} />
            <DescriptionContent label="이름" content={data?.description} />
            <DescriptionContent
              label="생성일"
              content={changeDays(data?.createdAt)}
            />
            <DescriptionContent
              label="수정일"
              content={changeDays(data?.updatedAt)}
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
          <Button
            type="submit"
            status="primary"
            disabled={isSubmitting}
            needMarginTop
          >
            수정
          </Button>
        </form>
      </GoodsGroupDetailBlock>
      <OptionIndex />
      <ItemIndex />
    </Fragment>
  );
};

export default GoodsGroupDetail;
