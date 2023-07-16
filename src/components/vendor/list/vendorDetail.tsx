import { Fragment } from "react";
import PageHeader from "lib/pages/pageHeader";
import { BreadCrumb, Responsive, Table } from "lib/styles";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import {
  changeDays,
  changePhone,
  changeStatus,
} from "lib/functions/changeInput";
import { Description, DescriptionContent } from "lib/styles/descriptionStyles";
import { Button } from "lib/styles";
import { StyledSelect } from "lib/styles/selectStyle";
import { vendorAdminListColumns } from "lib/columns/columnsList";
import { statusOption } from "lib/columns/statusColumns";
import { NavigateFunction, useNavigate } from "react-router-dom";

const VendorDetailBlock = styled(Responsive)``;

type detailProps = {
  vendor: any;
  onSubmit: (data: any) => void;
  onRegister: () => void;
  navigate: NavigateFunction;
  id: string | undefined;
};

const VendorDetail = ({
  vendor,
  onSubmit,
  onRegister,
  navigate,
  id,
}: detailProps) => {
  // const { basic, registration, account, service, address } =
  //   vendor?.info?.bizInfo;
  const basicInfo = vendor?.vendorInfo?.basicInfo;
  const productList = basicInfo?.sellProducts;
  const allProductList = () => {
    let listName = [];
    for (let i = 0; i < productList?.length; i++) {
      listName.push(productList[i].product.name);
    }
    return listName.join(", ");
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm();

  return (
    <Fragment>
      <VendorDetailBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "판매사 관리 /",
                  url: "/vendor/list",
                },
                {
                  name: "상세정보",
                  url: "",
                },
              ]}
            />
          }
        />
      </VendorDetailBlock>
      <VendorDetailBlock>
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <Description>
            <DescriptionContent
              label="코드"
              content={vendor?.info.code ? vendor?.info.code : "미발급"}
            />
            <DescriptionContent
              label="이름"
              content={vendor?.info?.bizInfo.basic.name}
            />
            <DescriptionContent
              label="생성일"
              content={changeDays(vendor?.base.createdAt)}
            />
            <DescriptionContent
              label="수정일"
              content={changeDays(vendor?.base.updatedAt)}
            />
            <DescriptionContent
              label="판매 수수료 관리"
              content={
                <Button
                  onClick={() => {
                    if (typeof id === "string") {
                      navigate(`/vendor/sellCharge/${id}`);
                    }
                  }}
                >
                  상세보기
                </Button>
              }
            />
            <DescriptionContent
              label="최소 적립금 관리"
              content={
                <Button
                  onClick={() => {
                    if (typeof id === "string") {
                      navigate(`/vendor/minPoint/${id}`);
                    }
                  }}
                >
                  상세보기
                </Button>
              }
            />
            <DescriptionContent
              label="권한"
              content={
                vendor?.info.bizStatus === "APPROVING" ? (
                  <Button onClick={onRegister} status="primary">
                    승인
                  </Button>
                ) : (
                  <StyledSelect
                    align="vertical"
                    placeholder={changeStatus(vendor?.info.bizStatus) || ""}
                    optionList={statusOption}
                    label="vendorStatus"
                    register={register}
                    setValue={setValue}
                  />
                )
              }
            />
          </Description>
          {vendor?.info.bizStatus === "APPROVING" ? null : (
            <Button
              type="submit"
              status="primary"
              withInput
              needMarginTop
              disabled={isSubmitting}
            >
              수정
            </Button>
          )}
        </form>
      </VendorDetailBlock>
      <VendorDetailBlock>
        <PageHeader title={`기본정보`} />
        <Description>
          <DescriptionContent
            label="취급품목"
            content={vendor?.info?.bizInfo.basic?.name}
          />
        </Description>
        <div style={{ marginTop: "1rem" }} />
        <PageHeader title={`기업 상세정보`} />
        <Description>
          {/* <DescriptionContent label="대표명" content={companyInfo?.ceo} /> */}
          {/* <DescriptionContent
            label="사업자 등록증"
            content={<Button>상세보기</Button>}
          /> */}
          <DescriptionContent
            label="사업자 등록번호"
            content={vendor?.info?.bizInfo.registration.number}
          />
          {/* <DescriptionContent
            label="통신판매업번호"
            content={registration.emailOrderNumber}
          /> */}
          <DescriptionContent
            label="업태"
            content={vendor?.info?.bizInfo.registration?.sector}
          />
          <DescriptionContent
            label="업종"
            content={vendor?.info?.bizInfo.registration.detail}
          />
          <DescriptionContent
            label="상담번호"
            content={changePhone(vendor?.info?.bizInfo.service.phone)}
          />
          {/* <DescriptionContent
            label="상담시간"
            content={`${companyInfo?.responseStartTime} ~ ${companyInfo?.responseEndTime}`}
          /> */}
          {/* <DescriptionContent
            label="우편번호"
            content={companyInfo?.address?.zipCode}
          />
          <DescriptionContent
            label="주소"
            content={`${companyInfo?.address?.basic} ${companyInfo?.address?.detail}`}
          /> */}
        </Description>
        <div style={{ marginTop: "1rem" }} />
        <PageHeader title={`계좌정보`} />
        <Description>
          <DescriptionContent
            label="예금주명"
            content={vendor?.info?.bizInfo.account.name}
          />
          <DescriptionContent
            label="은행명"
            content={vendor?.info?.bizInfo.account.bank}
          />
          <DescriptionContent
            label="계좌번호"
            content={vendor?.info?.bizInfo.account.number}
          />
          {/* <DescriptionContent
            label="통장사본"
            content={<Button>상세보기</Button>}
          /> */}
        </Description>
      </VendorDetailBlock>
      <VendorDetailBlock>
        <PageHeader title={`관리자 정보`} />
        <Table
          columns={vendorAdminListColumns}
          content={vendor?.admins}
          doNoting
          pagenation
        />
      </VendorDetailBlock>
    </Fragment>
  );
};

export default VendorDetail;
