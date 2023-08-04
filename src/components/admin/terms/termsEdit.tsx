import styled from "styled-components";
import {
  BreadCrumb,
  Description,
  DescriptionContent,
  ErrorMsg,
  Modal,
  Responsive,
  StyledSelect,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { StyledForm, StyledInput, Button } from "lib/styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { response } from "types/globalTypes";

const TermsEditBlock = styled(Responsive)``;

type termsEditProps = {
  editResult: response;
  termsDetail: response;
  onSubmit: <T>(data: T) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
};

const schema = yup.object({
  info: yup.string().required("약관내용을 입력해주세요."),
});

const TermsEdit = ({
  editResult,
  termsDetail,
  onSubmit,
  modalVisible,
  setModalVisible,
}: termsEditProps) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      info: "",
    },
  });

  useEffect(() => {
    setValue("info", termsDetail?.data?.info?.description);
  }, [termsDetail]);

  return (
    <>
      <TermsEditBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "약관 조회 /",
                  url: "/admin/terms",
                },
                {
                  name: "상세조회",
                  url: "",
                },
              ]}
            />
          }
        />
      </TermsEditBlock>
      <TermsEditBlock>
        <StyledForm
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
          })}
        >
          <Description>
            <DescriptionContent
              span="12"
              label="약관 내용"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="약관 내용"
                  label="info"
                  register={register}
                  errors={errors}
                  status={errors.info}
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
            약관 수정
          </Button>
        </StyledForm>
        <Modal
          title="약관 수정"
          msg="약관 수정 완료"
          submitMsg="확인"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          action={() => navigate(`/admin/terms`)}
        />
      </TermsEditBlock>
    </>
  );
};

export default TermsEdit;
