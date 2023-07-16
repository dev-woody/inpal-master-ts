import styled from "styled-components";
import {
  Description,
  DescriptionContent,
  Modal,
  Responsive,
  Button,
  StyledInput,
  StyledForm,
  PassShowBlock,
  BreadCrumb,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { StyledSelect } from "lib/styles/selectStyle";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { NavigateFunction } from "react-router-dom";
import { DataObj, response } from "types/globalTypes";

const PropertyAddBlock = styled(Responsive)`
  z-index: 99;
`;

type AddProps = {
  addResult: boolean;
  productList: response;
  resultMsg: string;
  onSubmit: (data: DataObj<string>) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
  navigate: NavigateFunction;
};

const schema = yup.object({
  productId: yup.string().required("항목을 선택해주세요."),
  property: yup.string().required("상품속성을 입력해주세요."),
  password: yup.string().required("비밀번호를 입력해주세요."),
});

const PropertyAdd = ({
  addResult,
  productList,
  resultMsg,
  onSubmit,
  modalVisible,
  setModalVisible,
  navigate,
}: AddProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      productId: "",
      property: "",
      password: "",
    },
  });
  const [isPassShow, setIsPassShow] = useState<boolean>(false);

  return (
    <>
      <PropertyAddBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "상품속성 관리 /",
                  url: "/code/property",
                },
                {
                  name: "상품속성 등록",
                  url: "",
                },
              ]}
            />
          }
        />
      </PropertyAddBlock>
      <PropertyAddBlock>
        <StyledForm
          onSubmit={handleSubmit(
            (data) => onSubmit(data),
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
                  optionList={productList}
                  label="productId"
                  register={register}
                  setValue={setValue}
                  getValues={getValues("productId")}
                  errors={errors}
                  status={errors.productId}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="상품속성"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="상품속성"
                  label="property"
                  register={register}
                  errors={errors}
                  status={errors.property}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="비밀번호 확인"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="비밀번호 확인"
                  type={isPassShow ? "text" : "password"}
                  endItem={
                    <PassShowBlock
                      isPassShow={isPassShow}
                      setIsPassShow={setIsPassShow}
                    />
                  }
                  label="password"
                  register={register}
                  errors={errors}
                  status={errors.password}
                />
              }
            />
          </Description>
          <Button
            type="submit"
            needMarginTop
            disabled={isSubmitting}
            status="primary"
            withInput
          >
            등록
          </Button>
        </StyledForm>
        <Modal
          title="상품명 추가"
          msg="상품명 추가를 완료하였습니다."
          submitMsg="확인"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          action={() => navigate(`/code/property`)}
        />
      </PropertyAddBlock>
    </>
  );
};

export default PropertyAdd;
