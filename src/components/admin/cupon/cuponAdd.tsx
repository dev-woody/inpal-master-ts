import styled from "styled-components";
import {
  BreadCrumb,
  Description,
  DescriptionContent,
  Modal,
  Responsive,
  StyledUpload,
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
  // uploadImage: response;
  onSubmit: <T>(data: T) => void;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
};

const schema = yup.object({
  kind: yup.string().required("종류를 입력해주세요."),
  description: yup.string().required("설명을 입력해주세요."),
  expirationDays: yup.string().required("잔여일을 입력해주세요."),
  imageId: yup.string().required("이미지를 등록해주세요."),
});

const CuponAdd = ({
  addResult,
  // uploadImage,
  onUpload,
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
      kind: "",
      description: "",
      expirationDays: "",
      imageId: "",
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
            (data) => onSubmit({ data }),
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
                  label="kind"
                  register={register}
                  errors={errors}
                  status={errors.kind}
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
            {/* <DescriptionContent
              span="12"
              label="쿠폰이미지"
              content={
                <StyledUpload
                  // align="vertical"
                  readOnly
                  placeholder="쿠폰이미지"
                  label="imageId"
                  register={register}
                  errors={errors || "이미지는 필수입니다."}
                  status={errors.imageId}
                  onImageUpload={onUpload}
                  image={uploadImage}
                  deleteImage={deleteImage}
                  imageKind="imageId"
                  isBox
                  imageArray={imageArray}
                  thumnailUrl={`/master/coupon/image/display`}
                  params={{
                    id: uploadImage?.data?.id,
                    isThumbnail: true,
                  }}
                />
              }
            /> */}
          </Description>
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
