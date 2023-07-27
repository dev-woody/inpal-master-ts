import PageHeader from "lib/pages/pageHeader";
import {
  BreadCrumb,
  Description,
  DescriptionContent,
  Modal,
  Responsive,
  StyledUpload,
} from "lib/styles";
import { StyledForm, StyledInput, Button, PassShowBlock } from "lib/styles";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { NavigateFunction } from "react-router-dom";
import { DataObj, checkStatus, response } from "types/globalTypes";
import { changeDays, changeOpenStatus } from "lib/functions/changeInput";

const ManufacturerBasicEditBlock = styled(Responsive)``;

type manufacturerProps = {
  manufacturerDetail: response;
  checkPassword: response;
  productId: response;
  basicEditResult: response;
  onSubmit: (data: any) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
  navigate: NavigateFunction;
  id: string | undefined;
};

const schema = yup.object({
  nameKr: yup.string().required("제조사명을 입력해주세요."),
  nameEn: yup.string().required("제조사명을 입력해주세요."),
  country: yup.string().required("생산국가를 입력해주세요."),
  logoImageInfo: yup.object({ id: yup.string() }),
  password: yup.string().required("비밀번호를 입력해주세요."),
});

const ManufacturerBasicEdit = ({
  manufacturerDetail,
  productId,
  basicEditResult,
  onSubmit,
  modalVisible,
  setModalVisible,
  navigate,
  id,
}: manufacturerProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nameKr: "",
      nameEn: "",
      country: "",
      logoImageInfo: {},
      password: "",
    },
  });
  const [isPassShow, setIsPassShow] = useState<boolean>(false);
  const data = manufacturerDetail.data;

  useEffect(() => {
    if (checkStatus(basicEditResult.status)) {
      reset();
    }
  }, [basicEditResult]);

  useEffect(() => {
    setValue("nameKr", data?.info.basic.info.nameKr);
    setValue("nameEn", data?.info.basic.info.nameEn);
    setValue("country", data?.info.basic.info.country);
    setValue("logoImageInfo", { id: data?.info.basic.info.logoImage.id });
  }, [manufacturerDetail]);

  return (
    <ManufacturerBasicEditBlock>
      <StyledForm
        onSubmit={handleSubmit(
          (data) => onSubmit(data),
          (errors) => console.log(errors)
        )}
      >
        <Description>
          <DescriptionContent label="코드" content={data?.info.code} />
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
            label="사용상태"
            content={changeOpenStatus(data?.info.openStatus)}
          />
          <DescriptionContent
            span="12"
            label="제조사명"
            content={
              <StyledInput
                align="vertical"
                placeholder="제조사명"
                label="nameKr"
                register={register}
                errors={errors.nameKr?.message}
                status={errors.nameKr}
              />
            }
          />
          <DescriptionContent
            span="12"
            label="영문명"
            content={
              <StyledInput
                align="vertical"
                placeholder="영문명"
                label="nameEn"
                register={register}
                errors={errors.nameEn?.message}
                status={errors.nameEn}
              />
            }
          />
          <DescriptionContent
            span="12"
            label="제조 국가"
            content={
              <StyledInput
                align="vertical"
                placeholder="제조 국가"
                label="country"
                register={register}
                errors={errors.country?.message}
                status={errors.country}
              />
            }
          />
          <DescriptionContent
            span="12"
            label="로고이미지"
            content={
              <StyledUpload
                readOnly
                placeholder="로고이미지"
                label="logoImageInfo"
                fullWidth
                isBox
                maxLength="1"
                register={register}
                errors={errors}
                status={errors.logoImageInfo}
                action={() => console.log()}
                subject="manufacturer"
                type="logo"
                isThumbnailImage={[
                  { imageId: data?.info.basic.info.logoImage.id },
                ]}
                successAction={(result: any) => {
                  const imageArray = result.map((image: any) => {
                    return { id: image.imageId };
                  });
                  setValue("logoImageInfo", imageArray[0]);
                }}
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
                errors={errors.password?.message}
                status={errors.password}
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
          수정
        </Button>
      </StyledForm>
      <Modal
        title="제조사 수정"
        msg="제조사 수정을 완료하였습니다."
        submitMsg="확인"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        // action={() => {
        //   if (typeof id === "string") {
        //     navigate(`/code/manufacturer/detail/${id}`);
        //   }
        // }}
      />
    </ManufacturerBasicEditBlock>
  );
};

export default ManufacturerBasicEdit;
