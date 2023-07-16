import styled from "styled-components";
import {
  Button,
  Description,
  DescriptionContent,
  Modal,
  Responsive,
  StyledForm,
  StyledInput,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { changeDays, changeOpenStatus } from "lib/functions/changeInput";
import { NavigateFunction } from "react-router-dom";
import { response } from "types/globalTypes";
import { useEffect } from "react";

const MinPointEditBlock = styled(Responsive)``;

type EditProps = {
  minPointDetail: response;
  onSubmit: ({ data }: { data: object }) => void;
  navigate: NavigateFunction;
  vendorId: string | undefined;
  id: string | undefined;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
};

const schema = yup.object({
  pointRatio: yup.string().required("최소적립금을 입력해주세요."),
  memo: yup.string().required("메모를 입력해주세요."),
});

const MinPointEdit = ({
  minPointDetail,
  onSubmit,
  navigate,
  vendorId,
  id,
  modalVisible,
  setModalVisible,
}: EditProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      pointRatio: "",
      memo: "",
    },
  });
  const data = minPointDetail.data;

  useEffect(() => {
    setValue("pointRatio", data?.pointRatio.replace(/\%/g, ""));
    setValue("memo", data?.memo);
  }, [minPointDetail]);

  return (
    <MinPointEditBlock>
      <PageHeader title="최소 적립금 조회" />
      <StyledForm
        onSubmit={handleSubmit(
          (data) => onSubmit({ data }),
          (errors) => console.log(errors)
        )}
      >
        <Description>
          <DescriptionContent label="등록인" content={data?.masterUserId} />
          <DescriptionContent label="품목명" content={data?.productName} />
          <DescriptionContent
            label="등록일"
            content={changeDays(data?.createdAt)}
          />
          <DescriptionContent
            label="수정일"
            content={changeDays(data?.updatedAt)}
          />
          <DescriptionContent
            span="12"
            label="판매사명"
            content={data?.vendorName}
          />
          <DescriptionContent
            span="12"
            label="최소 적립금"
            content={
              <StyledInput
                align="vertical"
                placeholder="최소 적립금"
                label="pointRatio"
                register={register}
                errors={errors.pointRatio?.message}
                status={errors.pointRatio}
              />
            }
          />
          <DescriptionContent
            span="12"
            label="메모"
            content={
              <StyledInput
                align="vertical"
                placeholder="메모"
                label="memo"
                register={register}
                errors={errors.memo?.message}
                status={errors.memo}
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
          확인
        </Button>
      </StyledForm>
      <Modal
        title="최소 적립금 수정"
        msg="최소 적립금을 완료하였습니다."
        submitMsg="확인"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        action={() => {
          if (typeof vendorId === "string") {
            navigate(`/vendor/minPoint/${vendorId}`);
          }
        }}
      />
    </MinPointEditBlock>
  );
};

export default MinPointEdit;
