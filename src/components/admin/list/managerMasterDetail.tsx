import { Fragment, useEffect, useState } from "react";
import PageHeader from "lib/pages/pageHeader";
import {
  BreadCrumb,
  Button,
  ErrorMsg,
  Modal,
  Responsive,
  StyledForm,
  StyledInput,
  StyledSearchInput,
} from "lib/styles";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { changeDays, changePhone } from "lib/functions/changeInput";
import { Description, DescriptionContent } from "lib/styles/descriptionStyles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DataObj, checkStatus, response, userType } from "types/globalTypes";

type MasterProps = {
  master: response;
  user: userType;
  changePass: response;
  onSubmit: (data: DataObj<string>) => void;
  onEditPass: (data: any) => void;
  onReset: (type: string) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
};

const ManagerMasterDetailBlock = styled(Responsive)``;

const schema = yup.object({
  email: yup
    .string()
    .matches(
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
      "이메일 형식에 맞지않습니다."
    )
    .required("이메일을 입력해주세요."),
  phone: yup.string().required("전화번호를 입력해주세요."),
});

const ManagerMasterDetail = ({
  user,
  master,
  changePass,
  onSubmit,
  onEditPass,
  onReset,
  modalVisible,
  setModalVisible,
}: MasterProps) => {
  const data = master.data;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      phone: "",
    },
  });

  const [editPass, setEditPass] = useState<boolean>(false);

  useEffect(() => {
    setValue("email", data?.info.email);
    setValue("phone", changePhone(data?.info.phone));
  }, [master]);

  const navigate = useNavigate();
  return (
    <Fragment>
      <ManagerMasterDetailBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "마스터 조회 /",
                  url: "/admin/master",
                },
                {
                  name: "상세정보",
                  url: "",
                },
              ]}
            />
          }
          extra={
            user.signInfo.userId === data?.info?.signInfo.userId && (
              <Button onClick={() => setEditPass(true)} status="primary">
                비밀번호 변경
              </Button>
            )
          }
        />
        <Modal
          title="비밀번호 변경"
          msg={
            <div>
              {checkStatus(changePass.status) ? (
                "수정이 완료되었습니다."
              ) : (
                <StyledSearchInput
                  type="password"
                  align="vertical"
                  placeholder="비밀번호 변경"
                  label="비밀번호 변경"
                  buttonText="수정"
                  action={(password: any) => {
                    onEditPass({
                      userId: user.signInfo.userId,
                      password: password.target.control.value,
                    });
                  }}
                />
              )}
              <ErrorMsg>{changePass.message}</ErrorMsg>
            </div>
          }
          submitMsg={checkStatus(changePass.status) ? "확인" : "취소"}
          modalVisible={editPass}
          setModalVisible={setEditPass}
          action={() => {
            checkStatus(changePass.status) && onReset("changePass");
          }}
        />
      </ManagerMasterDetailBlock>
      <ManagerMasterDetailBlock>
        <PageHeader title={`${data?.info.signInfo.userId} 상세정보`} />
        <StyledForm
          onSubmit={handleSubmit(
            (data) => onSubmit(data),
            (errors) => console.log(errors)
          )}
        >
          <Description>
            <DescriptionContent
              label="아이디"
              content={data?.info?.signInfo.userId}
            />
            <DescriptionContent label="이름" content={data?.info?.name} />
            <DescriptionContent
              span={
                user.signInfo.userId === data?.info?.signInfo.userId ? "12" : ""
              }
              label="이메일"
              content={
                user.signInfo.userId === data?.info?.signInfo.userId ? (
                  <StyledInput
                    align="vertical"
                    placeholder={data?.info.email}
                    label="email"
                    register={register}
                    errors={errors.email?.message}
                    status={errors.email}
                  />
                ) : (
                  data?.info.email
                )
              }
            />
            <DescriptionContent
              span={
                user.signInfo.userId === data?.info?.signInfo.userId ? "12" : ""
              }
              label="전화번호"
              content={
                user.signInfo.userId === data?.info?.signInfo.userId ? (
                  <StyledInput
                    align="vertical"
                    placeholder={changePhone(data?.phone)}
                    label="phone"
                    register={register}
                    errors={errors.phone?.message}
                    status={errors.phone}
                  />
                ) : (
                  changePhone(data?.info.phone)
                )
              }
            />
            <DescriptionContent
              label="생성일"
              content={changeDays(data?.base.createdAt)}
            />
            <DescriptionContent
              label="수정일"
              content={changeDays(data?.base.updatedAt)}
            />
            <DescriptionContent
              label="권한"
              content={data?.info.isTopLevel ? "최고권한" : "하위권한"}
            />
          </Description>
          <div>
            <Button
              type="button"
              needMarginTop
              withInput
              disabled={isSubmitting}
              onClick={() => navigate("/admin/master")}
            >
              뒤로가기
            </Button>
            {user.signInfo.userId === data?.info?.signInfo.userId && (
              <Button type="submit" status="primary" needMarginTop withInput>
                수정
              </Button>
            )}
          </div>
        </StyledForm>
        <Modal
          title="관리자 수정"
          msg="수정을 완료하였습니다."
          submitMsg="확인"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          // action={() => navigate(`/admin/master`)}
        />
      </ManagerMasterDetailBlock>
    </Fragment>
  );
};

export default ManagerMasterDetail;
