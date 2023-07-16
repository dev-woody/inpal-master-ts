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
import { DataObj } from "types/globalTypes";

const DealerDetailBlock = styled(Responsive)``;

type dealerDetailProps = {
  onSubmit: (data: DataObj<string>) => void;
  onRegister: () => void;
};

const DealerDetail = ({ onSubmit, onRegister }: dealerDetailProps) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm();
  const user = testDealerData[0];

  const companyInfo = testDealerData[0]?.dealerInfo?.companyInfo;
  const adminInfo = testDealerData[0]?.admin;
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
            <DescriptionContent label="코드" content={user?.code} />
            <DescriptionContent label="이름" content={user?.name} />
            <DescriptionContent label="대표품목" content={user?.headProduct} />
            <DescriptionContent label="자기소개" content={user?.selfIntro} />
            <DescriptionContent label="포인트" content={user?.savedPoint} />
            <DescriptionContent
              label="승인일시"
              content={changeDays(user?.approvedAt)}
            />
            <DescriptionContent
              label="생성일"
              content={changeDays(user?.createdAt)}
            />
            <DescriptionContent
              label="수정일"
              content={changeDays(user?.updatedAt)}
            />
            <DescriptionContent
              label="신분증 사본"
              content={<Button type="button">상세보기</Button>}
            />
            <DescriptionContent
              label="상태"
              content={
                user?.dealerStatus === "APPROVING" ? (
                  <Button onClick={onRegister} status="primary">
                    승인
                  </Button>
                ) : (
                  <StyledSelect
                    align="vertical"
                    placeholder={changeStatus(user?.dealerStatus) || ""}
                    optionList={statusOption}
                    label="dealerStatus"
                    register={register}
                    setValue={setValue}
                  />
                )
              }
            />
          </Description>
          <Button type="submit" status="primary" needMarginTop>
            수정
          </Button>
        </form>
      </DealerDetailBlock>
      <DealerDetailBlock>
        <PageHeader title={`사업자정보`} />
        <Description>
          <DescriptionContent label="대표명" content={companyInfo?.ceo} />
          <DescriptionContent
            label="회사번호"
            content={changePhone(companyInfo?.address?.phone)}
          />
          <DescriptionContent
            label="우편번호"
            content={companyInfo?.address?.zipCode}
          />
          <DescriptionContent
            label="상세주소"
            content={
              companyInfo?.address?.basic + " " + companyInfo?.address?.detail
            }
          />
          <DescriptionContent
            label="사업자등록증"
            content={<Button type="button">상세보기</Button>}
          />
        </Description>
      </DealerDetailBlock>
      <DealerDetailBlock>
        <PageHeader title={`회원정보`} />
        <Description>
          <DescriptionContent label="아이디" content={adminInfo?.userId} />
          <DescriptionContent label="이름" content={adminInfo?.name} />
          <DescriptionContent label="이메일" content={adminInfo?.email} />
          <DescriptionContent
            label="전화번호"
            content={changePhone(adminInfo?.phone)}
          />
          <DescriptionContent label="성별" content={adminInfo?.sex} />
          <DescriptionContent
            label="생년월일"
            content={changeDays(adminInfo?.birthDate)}
          />
          <DescriptionContent
            label="생성일"
            content={changeDays(adminInfo?.createdAt)}
          />
          <DescriptionContent
            label="수정일"
            content={changeDays(adminInfo?.updatedAt)}
          />
        </Description>
      </DealerDetailBlock>
    </Fragment>
  );
};

export default DealerDetail;
