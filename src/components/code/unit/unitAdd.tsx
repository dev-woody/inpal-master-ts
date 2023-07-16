import styled from "styled-components";
import {
  BreadCrumb,
  Button,
  Description,
  DescriptionContent,
  Modal,
  PassShowBlock,
  Responsive,
  StyledForm,
  StyledInput,
  StyledSelect,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { DataObj, response } from "types/globalTypes";
import { NavigateFunction } from "react-router-dom";

const UnitAddBlock = styled(Responsive)``;

type UnitAddProps = {
  productList: response;
  onSubmit: (data: DataObj<string>) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
  navigate: NavigateFunction;
};

const schema = yup.object({
  productId: yup.string().required("품목을 선택해주세요."),
  nameKr: yup.string().required("단위명(한)을 입력해주세요."),
  nameEn: yup.string().required("단위명을 입력해주세요."),
  password: yup.string().required("비밀번호를 입력해주세요."),
});

const UnitAdd = ({
  productList,
  onSubmit,
  modalVisible,
  setModalVisible,
  navigate,
}: UnitAddProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      productId: "",
      nameKr: "",
      nameEn: "",
      password: "",
    },
  });
  const [isPassShow, setIsPassShow] = useState<boolean>(false);
  return (
    <>
      <UnitAddBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "단위 관리 /",
                  url: "/code/unit",
                },
                {
                  name: "단위 등록",
                  url: "",
                },
              ]}
            />
          }
        />
      </UnitAddBlock>
      <UnitAddBlock>
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
                  optionList={productList.data}
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
              label="단위(한)"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="단위(한)"
                  label="nameKr"
                  register={register}
                  errors={errors}
                  status={errors.nameKr}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="단위"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="단위"
                  label="nameEn"
                  register={register}
                  errors={errors}
                  status={errors.nameEn}
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
          title="단위 등록"
          msg="단위 등록을 완료하였습니다."
          submitMsg="확인"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          action={() => navigate(`/code/unit`)}
        />
      </UnitAddBlock>
    </>
  );
};

export default UnitAdd;
