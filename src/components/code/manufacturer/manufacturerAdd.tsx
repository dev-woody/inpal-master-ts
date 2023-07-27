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
  StyledUpload,
  ErrorMsg,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { StyledSelect } from "lib/styles/selectStyle";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { NavigateFunction } from "react-router-dom";
import { DataObj, response } from "types/globalTypes";

const ManufacturerAddBlock = styled(Responsive)`
  z-index: 99;
`;

type AddProps = {
  addResult: response;
  checkPassword: response;
  productList: response;
  resultMsg: string;
  onSubmit: (data: any) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
  navigate: NavigateFunction;
};

const schema = yup.object({
  productId: yup.string().required("항목을 선택해주세요."),
  nameKr: yup.string().required("제조사명을 입력해주세요."),
  nameEn: yup.string().required("영문명을 입력해주세요."),
  country: yup.string().required("제조국가를 입력해주세요."),
  logoImageInfo: yup.object({}),
  imageNumInfos: yup
    .array()
    .of(
      yup.object({
        num: yup.number(),
        imageInfo: yup.object({ id: yup.string() }),
      })
    )
    .min(1)
    .max(10),
  password: yup.string().required("비밀번호를 입력해주세요."),
});

const ManufacturerAdd = ({
  addResult,
  checkPassword,
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
    watch,
    setValue,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      productId: "",
      nameKr: "",
      nameEn: "",
      isDomestic: "",
      country: "",
      logoImageInfo: [],
      imageNumInfos: [],
      password: "",
    },
  });
  const [isPassShow, setIsPassShow] = useState<boolean>(false);
  const [isDetailImage, setIsDetailImage] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <>
      {}
      <ManufacturerAddBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "제조사 관리 /",
                  url: "/code/manufacturer",
                },
                {
                  name: "제조사 등록",
                  url: "",
                },
              ]}
            />
          }
        />
      </ManufacturerAddBlock>
      <ManufacturerAddBlock>
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
              label="제조사명"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="제조사명"
                  label="nameKr"
                  register={register}
                  errors={errors}
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
                  errors={errors}
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
                  errors={errors}
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
                  successAction={
                    (result: any) => {
                      const imageArray = result.map((image: any) => {
                        return { id: image.imageId };
                      });
                      setValue("logoImageInfo", imageArray[0]);
                    }
                    // setValue("logoImageInfo", result)
                  }
                />
              }
            />
            <DescriptionContent
              span="12"
              label="상세페이지"
              content={
                <StyledUpload
                  readOnly
                  placeholder="상세페이지"
                  label="imageNumInfos"
                  fullWidth
                  isBox
                  maxLength="10"
                  register={register}
                  errors={errors}
                  status={errors.imageNumInfos}
                  action={() => console.log()}
                  subject="manufacturer"
                  type="detail_page"
                  successAction={(result: any) => {
                    const imageArray = result.map(
                      (image: any, index: number) => {
                        return { num: index, imageInfo: { id: image.imageId } };
                      }
                    );
                    setValue("imageNumInfos", imageArray);
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
                  errors={errors}
                  status={errors.password}
                />
              }
            />
          </Description>
          <ErrorMsg>{addResult.message || checkPassword.message}</ErrorMsg>
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
          title="제조사 추가"
          msg="제조사 추가를 완료하였습니다."
          submitMsg="확인"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          action={() => navigate(`/code/manufacturer`)}
        />
      </ManufacturerAddBlock>
    </>
  );
};

export default ManufacturerAdd;
