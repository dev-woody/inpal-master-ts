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
  StyledSelect,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavigateFunction } from "react-router-dom";
import { response } from "types/globalTypes";

const SellChargeAddBlock = styled(Responsive)``;

type RegisterProps = {
  productList: response;
  registerResult: response;
  onSubmit: ({ data }: { data: FieldValues }) => void;
  navigate: NavigateFunction;
  vendorId: string | undefined;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
};

const schema = yup.object({
  productId: yup.string().required("품목을 선택해주세요."),
  masterCharge: yup.string().required("판매 수수료를 입력해주세요."),
});

const SellChargeAdd = ({
  productList,
  registerResult,
  onSubmit,
  navigate,
  vendorId,
  modalVisible,
  setModalVisible,
}: RegisterProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      productId: "",
      masterCharge: "",
    },
  });

  const { pageNum, isDesc } = JSON.parse(
    sessionStorage.getItem("vendorPageInfo") || "{}"
  );
  return (
    <>
      <SellChargeAddBlock>
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
                  name: "수수료 등록",
                  url: ``,
                },
              ]}
            />
          }
        />
      </SellChargeAddBlock>
      <SellChargeAddBlock>
        <PageHeader title="판매 수수료 등록" />
        <StyledForm
          onSubmit={handleSubmit(
            (data) => onSubmit({ data }),
            (errors) => console.log(errors)
          )}
        >
          <Description>
            <DescriptionContent
              span="12"
              label="품목선택"
              content={
                <StyledSelect
                  align="vertical"
                  placeholder="품목 선택"
                  optionList={productList.data}
                  label="productId"
                  register={register}
                  setValue={setValue}
                  errors={errors.productId?.message}
                  status={errors.productId}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="판매 수수료"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="판매 수수료"
                  label="masterCharge"
                  register={register}
                  errors={errors.masterCharge?.message}
                  status={errors.masterCharge}
                />
              }
            />
          </Description>
          <ErrorMsg>{registerResult.message}</ErrorMsg>
          <div>
            <Button
              onClick={() => navigate(`/vendor/list/${vendorId}/sellFees`)}
              type="button"
              withInput
              needMarginTop
            >
              뒤로가기
            </Button>
            <Button
              type="submit"
              needMarginTop
              disabled={isSubmitting}
              status="primary"
              withInput
            >
              등록
            </Button>
          </div>
        </StyledForm>
        <Modal
          title="단위 등록"
          msg="단위 등록을 완료하였습니다."
          submitMsg="확인"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          action={() => {
            if (typeof vendorId === "string") {
              navigate(`/vendor/sellCharge/${vendorId}`);
            }
          }}
        />
      </SellChargeAddBlock>
    </>
  );
};

export default SellChargeAdd;
