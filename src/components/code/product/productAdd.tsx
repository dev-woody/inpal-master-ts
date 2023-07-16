import styled from "styled-components";
import {
  BreadCrumb,
  Description,
  DescriptionContent,
  Modal,
  Responsive,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { Button, StyledInput, StyledForm, PassShowBlock } from "lib/styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataObj, response } from "types/globalTypes";

const ProductAddBlock = styled(Responsive)``;

type AddProps = {
  addResult: response;
  onSubmit: (data: DataObj<string>) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
};

const schema = yup.object({
  nameEn: yup.string().required("영문명을 입력해주세요."),
  password: yup.string().required("비밀번호를 입력해주세요."),
});

const ProductAdd = ({
  addResult,
  onSubmit,
  modalVisible,
  setModalVisible,
}: AddProps) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nameEn: "",
      password: "",
    },
  });
  const [isPassShow, setIsPassShow] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (addResult.success) {
      reset();
    }
  }, [addResult]);
  return (
    <>
      <ProductAddBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "품목 관리 /",
                  url: "/code/product",
                },
                {
                  name: "품목 등록",
                  url: "",
                },
              ]}
            />
          }
        />
      </ProductAddBlock>
      <ProductAddBlock>
        <StyledForm
          onSubmit={handleSubmit(
            (data) => onSubmit(data),
            (errors) => console.log(errors)
          )}
        >
          <Description>
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
          title="품목 등록"
          msg="품목 등록이 완료되었습니다."
          submitMsg="확인"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          action={() => navigate("/code/product")}
        />
      </ProductAddBlock>
    </>
  );
};

export default ProductAdd;
