import { Fragment } from "react";
import PageHeader from "lib/pages/pageHeader";
import { BreadCrumb, ErrorMsg, Modal, Responsive, Table } from "lib/styles";
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
import { statusOption } from "lib/columns/statusColumns";
import { NavigateFunction } from "react-router-dom";
import { response } from "types/globalTypes";

const VendorDetailBlock = styled(Responsive)``;

type detailProps = {
  vendor: any;
  setBizStatus: response;
  onSubmit: (data: any) => void;
  onRegister: () => void;
  navigate: NavigateFunction;
  vendorPageNum: string | undefined;
  id: string | undefined;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
};

const VendorDetail = ({
  vendor,
  setBizStatus,
  onSubmit,
  onRegister,
  navigate,
  id,
  modalVisible,
  setModalVisible,
}: detailProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm();

  const { n, d } = JSON.parse(sessionStorage.getItem("vendorPageInfo") || "{}");

  return (
    <Fragment>
      <VendorDetailBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "판매사 관리 /",
                  url: `/vendor/list?n=${n}&d=${d}`,
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
              label="기업명"
              content={vendor?.info.bizInfo.info.basic.info.name}
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
                  type="button"
                  onClick={() => {
                    if (typeof id === "string") {
                      navigate(`/vendor/list/${id}/sellFees`);
                    }
                  }}
                >
                  상세보기
                </Button>
              }
            />
            <DescriptionContent
              label="주문 관리"
              content={
                <Button
                  onClick={() => {
                    if (typeof id === "string") {
                      navigate(
                        `/vendor/list/${id}/order?n=${btoa("0")}&d=${btoa(
                          "false"
                        )}&s=${btoa("ALL")}`
                      );
                    }
                  }}
                >
                  상세보기
                </Button>
              }
            />
            <DescriptionContent
              label="상품 관리"
              content={
                <Button
                  onClick={() => {
                    if (typeof id === "string") {
                      navigate(
                        `/vendor/list/${id}/goods/group`
                      );
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
          <ErrorMsg>{setBizStatus.message}</ErrorMsg>
          {vendor?.info.bizStatus === "APPROVING" ? null : (
            <>
              <Button
                type="button"
                needMarginTop
                withInput
                disabled={isSubmitting}
                onClick={() => navigate(`/vendor/list?n=${n}&d=${d}`)}
              >
                뒤로가기
              </Button>
              <Button
                type="submit"
                status="primary"
                withInput
                needMarginTop
                disabled={isSubmitting}
              >
                수정
              </Button>
            </>
          )}
          <Modal
            title="판매사상태 수정"
            msg="판매사상태 수정을 완료하였습니다."
            submitMsg="확인"
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </form>
      </VendorDetailBlock>
      <VendorDetailBlock>
        <PageHeader title={`기본정보`} />
        <Description>
          <DescriptionContent
            label="취급품목"
            content={vendor?.info?.bizInfo.info.basic.info.handleProductOwner.info.productNums.map(
              (item: any) => {
                return item.info.product.info.nameKr + " ";
              }
            )}
          />
        </Description>
        <div style={{ marginTop: "1rem" }} />
        <PageHeader title={`기업 상세정보`} />
        <Description>
          {/* <DescriptionContent label="대표명" content={companyInfo?.ceo} /> */}
          <DescriptionContent
            label="사업자등록증"
            content={
              <Button
                type="button"
                onClick={() =>
                  navigate(
                    `/image/${vendor?.info?.bizInfo.info.registration.info.registrationImage?.id}`
                  )
                }
              >
                상세보기
              </Button>
            }
          />
          <DescriptionContent
            label="사업자 등록번호"
            content={vendor?.info?.bizInfo.info.registration.info.number}
          />
          {/* <DescriptionContent
            label="통신판매업번호"
            content={registration.emailOrderNumber}
          /> */}
          <DescriptionContent
            label="업태"
            content={vendor?.info?.bizInfo.info.registration.info.sector}
          />
          <DescriptionContent
            label="업종"
            content={vendor?.info?.bizInfo.info.registration.info.detail}
          />
          <DescriptionContent
            label="상담번호"
            content={changePhone(vendor?.info?.bizInfo.info.service.info.phone)}
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
            content={vendor?.info?.bizInfo.info.account.info.name}
          />
          <DescriptionContent
            label="은행명"
            content={vendor?.info?.bizInfo.info.account.info.bank}
          />
          <DescriptionContent
            label="통장사본"
            content={
              <Button
                type="button"
                onClick={() =>
                  navigate(
                    `/image/${vendor?.info?.bizInfo.info.account.info.accountImage?.id}`
                  )
                }
              >
                상세보기
              </Button>
            }
          />
          <DescriptionContent
            label="계좌번호"
            content={vendor?.info?.bizInfo.info.account.info.number}
          />
          {/* <DescriptionContent
            label="통장사본"
            content={<Button>상세보기</Button>}
          /> */}
        </Description>
      </VendorDetailBlock>
      {/* <VendorDetailBlock>
        <PageHeader title={`관리자 정보`} />
        <Table
          columns={vendorAdminListColumns}
          content={findAllByVendorId.data}
          doNoting
          pagenation
        />
      </VendorDetailBlock> */}
    </Fragment>
  );
};

export default VendorDetail;
