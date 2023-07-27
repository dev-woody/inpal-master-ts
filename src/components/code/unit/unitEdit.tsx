import styled from "styled-components";
import {
  BreadCrumb,
  Button,
  Description,
  DescriptionContent,
  ErrorMsg,
  Modal,
  PassShowBlock,
  Responsive,
  StyledForm,
  StyledInput,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { changeDays, changeOpenStatus } from "lib/functions/changeInput";
import { DataObj, response } from "types/globalTypes";
import { NavigateFunction } from "react-router-dom";

const UnitEditBlock = styled(Responsive)``;

type UnitUpdateProps = {
  unitDetail: response;
  productId: response;
  checkPassword: response;
  editResult: response;
  onSubmit: (data: DataObj<string>) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
  navigate: NavigateFunction;
  id: string | undefined;
};

const schema = yup.object({
  nameEn: yup.string().required("단위명을 입력해주세요."),
  nameKr: yup.string().required("단위명(한)을 입력해주세요."),
  password: yup.string().required("비밀번호를 입력해주세요."),
});

const UnitEdit = ({
  unitDetail,
  productId,
  checkPassword,
  editResult,
  onSubmit,
  modalVisible,
  setModalVisible,
  navigate,
  id,
}: UnitUpdateProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nameKr: "",
      nameEn: "",
      password: "",
    },
  });
  const [isPassShow, setIsPassShow] = useState<boolean>(false);
  const data = unitDetail.data;

  useEffect(() => {
    setValue("nameEn", data?.info.nameEn);
    setValue("nameKr", data?.info.nameKr);
  }, [unitDetail]);
  return (
    <>
      <UnitEditBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "단위 관리 /",
                  url: "/code/unit",
                },
                {
                  name: "상세 조회",
                  url: "",
                },
              ]}
            />
          }
        />
      </UnitEditBlock>
      <UnitEditBlock>
        <StyledForm
          onSubmit={handleSubmit(
            (data) => onSubmit(data),
            (errors) => console.log(errors)
          )}
        >
          <Description>
            <DescriptionContent
              label="품목명"
              content={productId.data?.info.nameKr}
            />
            <DescriptionContent
              label="등록일"
              content={changeDays(data?.base.createdAt)}
            />
            <DescriptionContent
              label="수정일"
              content={changeDays(data?.base.updatedAt)}
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
          <ErrorMsg>{checkPassword.message || editResult.message}</ErrorMsg>
          <div>
            <Button
              needMarginTop
              withInput
              onClick={() => navigate("/code/unit")}
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
          title="단위 수정"
          msg="단위 수정을 완료하였습니다."
          submitMsg="확인"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          // action={() => {
          //   if (typeof id === "string") {
          //     navigate(`/code/unit`);
          //   }
          // }}
        />
      </UnitEditBlock>
    </>
  );
};

export default UnitEdit;
