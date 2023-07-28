import styled from "styled-components";
import {
  Button,
  Description,
  DescriptionContent,
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
    setValue("charge", data?.chargeRatio.replace(/\%/g, ""));
  }, [sellChargeDetail]);

  return (
    <SellChargeEditBlock>
      <PageHeader title="판매 수수료 조회" />
      <StyledForm
        onSubmit={handleSubmit(
          (data) => onSubmit(data),
          (errors) => console.log(errors)
        )}
      >
        <Description>
          <DescriptionContent label="등록인" content={data?.masterUserId} />
          <DescriptionContent label="품목명" content={data?.productName} />
          <DescriptionContent
            label="등록일"
            content={changeDays(data?.createdAt)}
          />
          <DescriptionContent
            label="수정일"
            content={changeDays(data?.updatedAt)}
          />
          <DescriptionContent
            span="12"
            label="판매사명"
            content={data?.vendorName}
          />
          <DescriptionContent
            span="12"
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
        </Description>
        <Button
          type="submit"
          status="primary"
          needMarginTop
          disabled={isSubmitting}
          withInput
        >
          확인
        </Button>
      </StyledForm>
      <Modal
        title="판매 수수료 수정"
        msg="판매 수수료 수정을 완료하였습니다."
        submitMsg="확인"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        action={() => {
          if (typeof vendorId === "string") {
            navigate(`/vendor/sellCharge/${vendorId}`);
          }
        }}
      />
    </SellChargeEditBlock>
  );
};

export default SellChargeEdit;
