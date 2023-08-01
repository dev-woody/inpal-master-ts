import styled from "styled-components";
import {
  BreadCrumb,
  Description,
  DescriptionContent,
  ErrorMsg,
  Modal,
  Responsive,
  StyledSelect,
} from "lib/styles";
import { Button, StyledForm, StyledInput } from "lib/styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PageHeader from "lib/pages/pageHeader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { response } from "types/globalTypes";

const CuponAddBlock = styled(Responsive)``;

type cuponAddProps = {
  addResult: response;
  onSubmit: (data: any) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
};

const schema = yup.object({
  type: yup.string().required("종류를 입력해주세요."),
  kind: yup.string().required("마스터타이틀을 입력해주세요."),
  title: yup.string().required("타이틀을 입력해주세요."),
  description: yup.string().required("설명을 입력해주세요."),
  expirationDays: yup.string().required("잔여일을 입력해주세요."),
  disCountRate: yup.string().nullable(),
  point: yup.string().nullable(),
});

const CuponAdd = ({
  addResult,
  onSubmit,
  modalVisible,
  setModalVisible,
}: cuponAddProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: "",
      kind: "",
      title: "",
      description: "",
      expirationDays: "",
      disCountRate: null,
      point: null,
    },
  });

  const navigate = useNavigate();

  const [isType, setIsType] = useState<string>("");

  const typeColumns = [
    {
      name: "할인",
      id: "SALE",
    },
    {
      name: "포인트",
      id: "POINT",
    },
    {
      name: "등급업",
      id: "GRADE_UP",
    },
    {
      name: "다이아몬드 등급 업그레이드",
      id: "GO_TO_DIAMOND",
    },
  ];

  return (
    <>
      <CuponAddBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "쿠폰 조회 /",
                  url: "/admin/cupon",
                },
                {
                  name: "쿠폰 등록",
                  url: "",
                },
              ]}
            />
          }
        />
      </CuponAddBlock>
      <CuponAddBlock>
        <StyledForm
          onSubmit={handleSubmit(
            (data) => onSubmit(data),
            (errors) => console.log(errors)
          )}
        >
          <Description>
            <DescriptionContent
              span="12"
              label="종류"
              content={
                <StyledSelect
                  align="vertical"
                  placeholder="쿠폰종류선택"
                  optionList={typeColumns}
                  label="type"
                  register={register}
                  setValue={(label: "type", id: string) => {
                    setValue(label, id);
                    setIsType(id);
                  }}
                  getValues={getValues("type")}
                  errors={errors}
                  status={errors.type}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="마스터 타이틀"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="마스터 타이틀"
                  label="kind"
                  register={register}
                  errors={errors}
                  status={errors.kind}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="타이틀"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="타이틀"
                  label="title"
                  register={register}
                  errors={errors}
                  status={errors.title}
                />
              }
            />
            {isType === "SALE" && (
              <DescriptionContent
                span="12"
                label="할인률"
                content={
                  <StyledInput
                    align="vertical"
                    placeholder="할인률"
                    label="disCountRate"
                    register={register}
                    errors={errors}
                    status={errors.disCountRate}
                  />
                }
              />
            )}
            {isType === "POINT" && (
              <DescriptionContent
                span="12"
                label="포인트"
                content={
                  <StyledInput
                    align="vertical"
                    placeholder="포인트"
                    label="point"
                    register={register}
                    errors={errors}
                    status={errors.point}
                  />
                }
              />
            )}
            <DescriptionContent
              span="12"
              label="설명"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="설명"
                  label="description"
                  register={register}
                  errors={errors}
                  status={errors.description}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="잔여일"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="잔여일"
                  label="expirationDays"
                  register={register}
                  errors={errors}
                  status={errors.expirationDays}
                />
              }
            />
          </Description>
          <ErrorMsg>{addResult.message}</ErrorMsg>
          <Button
            type="submit"
            status="primary"
            needMarginTop
            withInput
            disabled={isSubmitting}
          >
            색상 등록
          </Button>
        </StyledForm>
        <Modal
          title="쿠폰 추가"
          msg="쿠폰 추가가 완료되었습니다."
          submitMsg="확인"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          action={() => navigate("/admin/cupon")}
        />
      </CuponAddBlock>
    </>
  );
};

export default CuponAdd;
