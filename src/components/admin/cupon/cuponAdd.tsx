import styled from "styled-components";
import {
  BreadCrumb,
  Description,
  DescriptionContent,
  ErrorMsg,
  Modal,
  Responsive,
} from "lib/styles";
import { Button, StyledForm, StyledInput } from "lib/styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PageHeader from "lib/pages/pageHeader";
import { ReactEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { response } from "types/globalTypes";

const CuponAddBlock = styled(Responsive)``;

type cuponAddProps = {
  addResult: response;
  onSubmit: <T>(data: T) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
};

const schema = yup.object({
  type: yup.string().required("종류를 입력해주세요."),
  kind: yup.string().required("마스터타이틀을 입력해주세요."),
  title: yup.string().required("타이틀을 입력해주세요."),
  description: yup.string().required("설명을 입력해주세요."),
  expirationDays: yup.string().required("잔여일을 입력해주세요."),
  disCountRate: yup.string(),
  // point: yup.string(),
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
      // point: null,
    },
  });

  const navigate = useNavigate();

  const [imageArray, setImageArray] = useState<{ id: string }[]>([]);
  const newArray = JSON.parse(JSON.stringify(imageArray));

  function deleteImage(id: string) {
    const deleteArray = newArray.filter(
      (list: { id: string }) => list.id !== id
    );
    setImageArray(deleteArray);
  }

  // useEffect(() => {
  //   if (uploadImage.success) {
  //     setValue("imageId", uploadImage.data.id);
  //   }
  // }, [uploadImage]);

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
                <StyledInput
                  align="vertical"
                  placeholder="종류"
                  label="type"
                  register={register}
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
            {/*   <DescriptionContent
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
            /> */}
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
