import styled from "styled-components";
import {
  BreadCrumb,
  Button,
  Description,
  DescriptionContent,
  ErrorMsg,
  Modal,
  Responsive,
  StyledForm,
  StyledInput,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { changeDays, changeOpenStatus } from "lib/functions/changeInput";
import { NavigateFunction } from "react-router-dom";
import { response } from "types/globalTypes";
import { useEffect } from "react";

const SellChargeEditBlock = styled(Responsive)``;

type EditProps = {
  sellChargeDetail: response;
  updateResult: response;
  onSubmit: (data: object) => void;
  navigate: NavigateFunction;
  vendorId: string | undefined;
  id: string | undefined;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
};

const schema = yup.object({
  charge: yup.string().required("판매수수료를 입력해주세요."),
});

const SellChargeEdit = ({
  sellChargeDetail,
  updateResult,
  onSubmit,
  navigate,
  vendorId,
  id,
  modalVisible,
  setModalVisible,
}: EditProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      charge: "",
    },
  });
  const data = sellChargeDetail.data;

  useEffect(() => {
    setValue("charge", data?.productNumInfo?.masterCharge);
  }, [sellChargeDetail]);

  const { pageNum, isDesc } = JSON.parse(
    sessionStorage.getItem("vendorPageInfo") || ""
  );

  return (
    <>
      <SellChargeEditBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "판매사 관리 /",
                  url: `/vendor/list?pageNum=${pageNum}&isDesc=${isDesc}`,
                },
                {
                  name: "상세정보 /",
                  url: `/vendor/list/${vendorId}`,
                },
                {
                  name: "판매 수수료 /",
                  url: `/vendor/list/${vendorId}/sellFees`,
                },
                {
                  name: "수수료 조회",
                  url: ``,
                },
              ]}
            />
          }
        />
      </SellChargeEditBlock>
      <SellChargeEditBlock>
        <PageHeader title="판매 수수료 조회" />
        <StyledForm
          onSubmit={handleSubmit(
            (data) => onSubmit(data),
            (errors) => console.log(errors)
          )}
        >
          <Description>
            <DescriptionContent
              label="품목명"
              content={data?.productNumInfo?.product?.info?.nameKr}
            />
            <DescriptionContent
              label="판매 수수료"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="판매 수수료"
                  label="charge"
                  register={register}
                  errors={errors}
                  status={errors.charge}
                />
              }
            />
            <DescriptionContent
              label="등록일"
              content={changeDays(data?.base?.createdAt)}
            />
            <DescriptionContent
              label="수정일"
              content={changeDays(data?.base?.updatedAt)}
            />
          </Description>
          <ErrorMsg>{updateResult.message}</ErrorMsg>
          <div>
            <Button
              type="button"
              needMarginTop
              withInput
              onClick={() => navigate(`/vendor/list/${vendorId}/sellFees`)}
            >
              뒤로가기
            </Button>
            <Button
              type="submit"
              status="primary"
              needMarginTop
              disabled={isSubmitting}
              withInput
            >
              확인
            </Button>
          </div>
        </StyledForm>
        <Modal
          title="판매 수수료 수정"
          msg="판매 수수료 수정을 완료하였습니다."
          submitMsg="확인"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          // action={() => {
          //   if (typeof vendorId === "string") {
          //     navigate(`/vendor/list/${vendorId}/sellFees`);
          //   }
          // }}
        />
      </SellChargeEditBlock>
    </>
  );
};

export default SellChargeEdit;
