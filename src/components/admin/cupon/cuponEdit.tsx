import styled from "styled-components";
import {
  BreadCrumb,
  Description,
  DescriptionContent,
  ErrorMsg,
  Modal,
  Responsive,
  StyledUpload,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { StyledForm, StyledInput, Button } from "lib/styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { response } from "types/globalTypes";

const CuponEditBlock = styled(Responsive)``;

type cuponEditProps = {
  editResult: response;
  cuponDetail: response;
  onSubmit: <T>(data: T) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
};

const schema = yup.object({
  kind: yup.string().required("종류를 입력해주세요."),
  title: yup.string().required("타이틀을 입력해주세요"),
  description: yup.string().required("설명을 입력해주세요."),
  expirationDays: yup.string().required("잔여일을 입력해주세요."),
});

const CuponEdit = ({
  editResult,
  cuponDetail,
  onSubmit,
  modalVisible,
  setModalVisible,
}: cuponEditProps) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      kind: "",
      title: "",
      description: "",
      expirationDays: "",
    },
  });

  const [imageArray, setImageArray] = useState<{ id: string }[]>([]);
  const newArray = JSON.parse(JSON.stringify(imageArray));

  function deleteImage(id: string) {
    const deleteArray = newArray.filter(
      (list: { id: string }) => list.id !== id
    );
    setImageArray(deleteArray);
  }

  useEffect(() => {
    setValue("kind", cuponDetail?.data?.info?.kind);
    setValue("title", cuponDetail?.data?.info?.title);
    setValue("description", cuponDetail?.data?.info?.description);
    setValue("expirationDays", cuponDetail?.data?.info?.expirationDays);
  }, [cuponDetail]);

  return (
    <>
      <CuponEditBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "쿠폰 조회 /",
                  url: "/admin/cupon",
                },
                {
                  name: "상세조회",
                  url: "",
                },
              ]}
            />
          }
        />
      </CuponEditBlock>
      <CuponEditBlock>
        <StyledForm
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
          })}
        >
          <Description>
            <DescriptionContent
              span="12"
              label="종류"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="종류"
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
          <ErrorMsg>{editResult.message}</ErrorMsg>
          <Button
            type="submit"
            status="primary"
            withInput
            needMarginTop
            disabled={isSubmitting}
          >
            쿠폰 등록
          </Button>
        </StyledForm>
        <Modal
          title="쿠폰 수정"
          msg="쿠폰 수정 완료"
          submitMsg="확인"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          action={() => navigate(`/admin/cupon`)}
        />
      </CuponEditBlock>
    </>
  );
};

export default CuponEdit;
