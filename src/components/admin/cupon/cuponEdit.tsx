import styled from "styled-components";
import {
  BreadCrumb,
  Description,
  DescriptionContent,
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
  // uploadImage: response;
  cuponDetail: response;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: <T>(data: T) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
};

const schema = yup.object({
  description: yup.string().required("설명을 입력해주세요."),
  expirationDays: yup.string().required("잔여일을 입력해주세요."),
  imageId: yup.string().required("이미지를 등록해주세요."),
});

const CuponEdit = ({
  editResult,
  // uploadImage,
  cuponDetail,
  onUpload,
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
      description: "",
      expirationDays: "",
      imageId: "",
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
    setValue("description", cuponDetail?.data?.description);
    setValue("expirationDays", cuponDetail?.data?.expirationDays);
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
            onSubmit({ data });
          })}
        >
          <Description>
            <DescriptionContent
              span="12"
              label="설명"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="설명"
                  label="description"
                  register={register}
                  errors={errors.description?.message}
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
                  errors={errors.expirationDays?.message}
                  status={errors.expirationDays}
                />
              }
            />
            {/* <DescriptionContent
              span="12"
              label="쿠폰이미지"
              content={
                <StyledUpload
                  readOnly
                  placeholder="쿠폰이미지"
                  label="imageId"
                  errors={errors.imageId?.message || "이미지는 필수입니다."}
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
                  thumnail={cuponDetail?.data?.image?.id}
                />
              }
            /> */}
          </Description>
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
