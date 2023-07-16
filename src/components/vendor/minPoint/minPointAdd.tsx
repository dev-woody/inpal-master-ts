import styled from "styled-components";
import {
  Button,
  Description,
  DescriptionContent,
  Modal,
  Responsive,
  StyledForm,
  StyledInput,
  StyledSelect,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavigateFunction } from "react-router-dom";
import { response } from "types/globalTypes";

const MinPointAddBlock = styled(Responsive)``;

type RegisterProps = {
  productList: response;
  onSubmit: ({ data }: { data: FieldValues }) => void;
  navigate: NavigateFunction;
  vendorId: string | undefined;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
};

const schema = yup.object({
  productId: yup.string().required("품목을 선택해주세요."),
  pointRatio: yup.string().required("최소 적립금를 입력해주세요."),
  memo: yup.string().required("메모를 입력해주세요."),
});

const MinPointAdd = ({
  productList,
  onSubmit,
  navigate,
  vendorId,
  modalVisible,
  setModalVisible,
}: RegisterProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      productId: "",
      pointRatio: "",
      memo: "",
    },
  });
  return (
    <MinPointAddBlock>
      <PageHeader title="최소 적립금 등록" />
      <StyledForm
        onSubmit={handleSubmit(
          (data) => onSubmit({ data }),
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
                errors={errors.productId?.message}
                status={errors.productId}
              />
            }
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
          needMarginTop
          disabled={isSubmitting}
          status="primary"
          withInput
        >
          등록
        </Button>
      </StyledForm>
      <Modal
        title="단위 등록"
        msg="단위 등록을 완료하였습니다."
        submitMsg="확인"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        action={() => {
          if (typeof vendorId === "string") {
            navigate(`/vendor/minPoint/${vendorId}`);
          }
        }}
      />
    </MinPointAddBlock>
  );
};

export default MinPointAdd;
