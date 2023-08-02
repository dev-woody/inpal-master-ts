import { Fragment } from "react";
import PageHeader from "lib/pages/pageHeader";
import { BreadCrumb, Responsive } from "lib/styles";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  changeDays,
  changePhone,
  changeStatus,
} from "lib/functions/changeInput";
import { Description, DescriptionContent } from "lib/styles/descriptionStyles";
import { Button } from "lib/styles";
import { StyledSelect } from "lib/styles/selectStyle";
import { testDealerData } from "types/data.test";
import { statusOption } from "lib/columns/statusColumns";
import { useForm } from "react-hook-form";
import { DataObj, response } from "types/globalTypes";

const DealerDetailBlock = styled(Responsive)``;

type dealerDetailProps = {
  dealerInfo: response;
  onSubmit: (data: any) => void;
  onApprove: () => void;
};

const DealerDetail = ({
  dealerInfo,
  onSubmit,
  onApprove,
}: dealerDetailProps) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm();
  const data = dealerInfo?.data?.info;

  return (
    <Fragment>
      <DealerDetailBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "시공업자 관리 /",
                  url: "/dealer/list",
                },
                {
                  name: "상세정보",
                  url: "",
                },
              ]}
            />
          }
        />
      </DealerDetailBlock>
      <DealerDetailBlock>
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <Description>
            <DescriptionContent
              label="코드"
              content={data?.code === null ? "미승인" : data?.code}
            />
            <DescriptionContent
              label="이름"
              content={data?.bizInfo?.info?.basic?.info?.name}
            />
            <DescriptionContent
              label="대표품목"
              content={data?.bizInfo?.info?.basic?.info?.handleProductOwner.info.productNums.map(
                (item: any) => {
                  return item?.info?.product?.info?.nameKr;
                }
              )}
            />
            <DescriptionContent
              label="승인일시"
              content={
                data?.approvedAt === null
                  ? "미승인"
                  : changeDays(data?.approvedAt)
              }
            />
            <DescriptionContent
              label="생성일"
              content={changeDays(dealerInfo?.data?.base?.createdAt)}
            />
            <DescriptionContent
              label="수정일"
              content={changeDays(dealerInfo?.data?.base?.updatedAt)}
            />
            <DescriptionContent
              label="상태"
              content={
                data?.bizStatus === "APPROVING" ? (
                  <Button type="button" onClick={onApprove} status="primary">
                    승인
                  </Button>
                ) : (
                  <StyledSelect
                    align="vertical"
                    placeholder={changeStatus(data?.bizStatus) || ""}
                    optionList={statusOption}
                    label="bizStatus"
                    register={register}
                    setValue={setValue}
                  />
                )
              }
            />
          </Description>
          {data?.bizStatus !== "APPROVING" && (
            <>
              <Button
                type="button"
                needMarginTop
                withInput
                disabled={isSubmitting}
                onClick={() => navigate("/dealer/list")}
              >
                뒤로가기
              </Button>
              <Button
                type="submit"
                status="primary"
                disabled={isSubmitting}
                needMarginTop
                withInput
              >
                수정
              </Button>
            </>
          )}
        </form>
      </DealerDetailBlock>
      <DealerDetailBlock>
        <PageHeader title={`사업자정보`} />
        <Description>
          <DescriptionContent
            label="대표명"
            content={data?.bizInfo?.info?.basic?.info?.ceo}
          />
          <DescriptionContent
            label="사업자등록증"
            content={
              <Button
                type="button"
                onClick={() =>
                  navigate(
                    `/image/${data?.bizInfo.info.registration.info.registrationImage?.id}`
                  )
                }
              >
                상세보기
              </Button>
            }
          />
          <DescriptionContent
            label="우편번호"
            content={data?.bizInfo?.info?.address?.info?.zipCode}
          />
          <DescriptionContent
            label="상세주소"
            content={
              data?.bizInfo?.info?.address?.info?.basic +
              " " +
              data?.bizInfo?.info?.address?.info?.detail
            }
          />
        </Description>
      </DealerDetailBlock>
      <DealerDetailBlock>
        <PageHeader title={`회원정보`} />
        <Description>
          <DescriptionContent
            label="아이디"
            content={data?.admin?.info?.signInfo?.userId}
          />
          <DescriptionContent
            label="이름"
            content={data?.admin?.info?.person?.info?.name}
          />
          <DescriptionContent
            label="이메일"
            content={data?.admin?.info?.person?.info?.email}
          />
          <DescriptionContent
            label="전화번호"
            content={changePhone(data?.admin?.info?.person?.info?.phone)}
          />
          <DescriptionContent
            label="성별"
            content={data?.admin?.info?.person?.info?.sex}
          />
          <DescriptionContent
            label="생년월일"
            content={changeDays(data?.admin?.info?.person?.info?.birthAt)}
          />
        </Description>
      </DealerDetailBlock>
    </Fragment>
  );
};

export default DealerDetail;
