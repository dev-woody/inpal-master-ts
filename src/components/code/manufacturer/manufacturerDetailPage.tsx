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
import { response } from "types/globalTypes";
import { changeDays, changeOpenStatus } from "lib/functions/changeInput";

const ManufacturerDetailPageBlock = styled(Responsive)``;

type manufacturerProps = {
  manufacturerDetail: response;
  productId: response;
  detailEditResult: boolean;
  onSubmit: (data: any) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
  navigate: NavigateFunction;
  id: string | undefined;
};

const schema = yup.object({
  imageNumInfos: yup
    .array()
    .of(
      yup.object({
        num: yup.string(),
        imageInfo: yup.object({ id: yup.string() }),
      })
    )
    .required("상세이미지를 입력해주세요."),
  password: yup.string().required("비밀번호를 입력해주세요."),
});

const ManufacturerDetailPage = ({
  manufacturerDetail,
  productId,
  detailEditResult,
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
      imageNumInfos: [],
      password: "",
    },
  });
  const [isPassShow, setIsPassShow] = useState<boolean>(false);
  const data = manufacturerDetail.data;

  useEffect(() => {
    if (detailEditResult) {
      reset();
    }
  }, [detailEditResult]);

  useEffect(() => {
    setValue("imageNumInfos", data?.info.detailPage.imageNums);
  }, [manufacturerDetail]);

  return (
    <ManufacturerDetailPageBlock>
      <StyledForm
        onSubmit={handleSubmit(
          (data) => onSubmit(data),
          (errors) => console.log(errors)
        )}
      >
        <Description>
          <DescriptionContent
            span="12"
            label="상세이미지"
            content={
              <StyledUpload
                readOnly
                placeholder="상세이미지"
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
                isThumbnailImage={data?.info.detailPage.imageNums.map(
                  (imageInfo: any) => {
                    return { imageId: imageInfo.image.id };
                  }
                )}
                successAction={(result: any) => {
                  const imageArray = result.map((image: any, index: number) => {
                    return { num: index, imageInfo: { id: image.imageId } };
                  });
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
        title="상세이미지 수정"
        msg="상세이미지 수정을 완료하였습니다."
        submitMsg="확인"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        action={() => {
          if (typeof id === "string") {
            navigate(`/code/manufacturer/detail/${id}`);
          }
        }}
      />
    </ManufacturerDetailPageBlock>
  );
};

export default ManufacturerDetailPage;
