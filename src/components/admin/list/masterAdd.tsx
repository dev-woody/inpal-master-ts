import styled from "styled-components";
import {
  Button,
  Responsive,
  StyledForm,
  StyledInput,
  Modal,
  Description,
  DescriptionContent,
  BreadCrumb,
  ErrorMsg,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { NavigateFunction } from "react-router-dom";
import { DataObj, checkStatus, response } from "types/globalTypes";
import { regexEmail, regexId, regexPasswd } from "lib/functions/changeInput";

const MasterAddBlock = styled(Responsive)``;

type addProps = {
  addResult: response;
  onSubmit: (data: any) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
  navigate: NavigateFunction;
};

const schema = yup.object({
  signInfo: yup.object({
    userId: yup
      .string()
      .matches(regexId, "소문자 하나 숫자 하나 이상 입력해주세요.")
      .required("아이디를 입력해주세요."),
    password: yup
      .string()
      .matches(
        regexPasswd,
        "최소 대소문자 하나 이상 특수문자 하나 이상 입력해주세요."
      )
      .required("비밀번호를 입력해주세요."),
  }),
  name: yup.string().required("이름을 입력해주세요."),
  email: yup
    .string()
    .matches(regexEmail, "이메일 형식에 맞지않습니다.")
    .required("이메일을 입력해주세요."),
  phone: yup.string().required("전화번호를 입력해주세요."),
});

const MasterAdd = ({
  addResult,
  onSubmit,
  modalVisible,
  setModalVisible,
  navigate,
}: addProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      signInfo: {
        userId: "",
        password: "",
      },
      name: "",
      email: "",
      phone: "",
    },
  });
  const [isPassShow, setIsPassShow] = useState<boolean>(false);
  const PassShowBlock = () => {
    return isPassShow ? (
      <AiFillEye onClick={() => setIsPassShow(false)} />
    ) : (
      <AiFillEyeInvisible onClick={() => setIsPassShow(true)} />
    );
  };

  useEffect(() => {
    if (checkStatus(addResult.status)) {
      reset();
    }
  }, [addResult]);
  return (
    <>
      <MasterAddBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "마스터 관리 /",
                  url: "/admin/master",
                },
                {
                  name: "마스터 관리",
                  url: "/admin/master/register",
                },
              ]}
            />
          }
        />
      </MasterAddBlock>
      <MasterAddBlock>
        <StyledForm
          onSubmit={handleSubmit(
            (data) => onSubmit(data),
            (errors) => console.log(errors)
          )}
        >
          <Description>
            <DescriptionContent
              span="12"
              label="아이디"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="아이디"
                  label="signInfo.userId"
                  register={register}
                  errors={errors}
                  status={errors.signInfo?.userId}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="비밀번호"
              content={
                <StyledInput
                  align="vertical"
                  type={isPassShow ? "text" : "password"}
                  placeholder="비밀번호"
                  label="signInfo.password"
                  register={register}
                  endItem={<PassShowBlock />}
                  errors={errors}
                  status={errors.signInfo?.password}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="이름"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="이름"
                  label="name"
                  register={register}
                  errors={errors}
                  status={errors.name}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="이메일"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="이메일"
                  label="email"
                  register={register}
                  errors={errors}
                  status={errors.email}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="전화번호"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="전화번호"
                  label="phone"
                  register={register}
                  errors={errors}
                  status={errors.phone}
                />
              }
            />
          </Description>
          <ErrorMsg>{addResult.message}</ErrorMsg>
          <Button
            type="submit"
            status="primary"
            disabled={isSubmitting}
            withInput
            needMarginTop
          >
            등록
          </Button>
        </StyledForm>
        <Modal
          title="관리자 등록"
          msg="등록에 성공하였습니다"
          submitMsg="확인"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          action={() => navigate("/admin/master")}
        />
      </MasterAddBlock>
    </>
  );
};

export default MasterAdd;
