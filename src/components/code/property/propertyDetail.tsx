import PageHeader from "lib/pages/pageHeader";
import {
  BreadCrumb,
  Description,
  DescriptionContent,
  ErrorMsg,
  Modal,
  PassShowBlock,
  Responsive,
  StyledForm,
  StyledInput,
} from "lib/styles";
import { Button } from "lib/styles";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { DataObj, response } from "types/globalTypes";
import { changeDays } from "lib/functions/changeInput";
import { useEffect, useState } from "react";

const PropertyDetailBlock = styled(Responsive)``;

type propertyProps = {
  propertyDetail: response;
  propertyEdit: response;
  checkPassword: response;
  onSubmit: (data: DataObj<string>) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
};

const schema = yup.object({
  property: yup.string().required("상품속성을 입력해주세요."),
  password: yup.string().required("비밀번호를 입력해주세요."),
});

const PropertyDetail = ({
  propertyDetail,
  propertyEdit,
  checkPassword,
  onSubmit,
  modalVisible,
  setModalVisible,
}: propertyProps) => {
  const { p, d } = JSON.parse(sessionStorage.getItem("property") || "{}");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      property: "",
      password: "",
    },
  });

  const [isPassShow, setIsPassShow] = useState<boolean>(false);
  const data = propertyDetail.data;

  const navigate = useNavigate();

  useEffect(() => {
    setValue("property", data?.info.property);
  }, [propertyDetail]);

  return (
    <>
      <PropertyDetailBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "상품속성 관리 /",
                  url: `/code/property?p=${p}&d=${d}`,
                },
                {
                  name: "상품속성 수정",
                  url: "",
                },
              ]}
            />
          }
        />
      </PropertyDetailBlock>
      <PropertyDetailBlock>
        <StyledForm
          onSubmit={handleSubmit(
            (data) => onSubmit(data),
            (errors) => console.log(errors)
          )}
        >
          <Description>
            <DescriptionContent
              span="12"
              label="상품속성"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="상품속성"
                  label="property"
                  register={register}
                  errors={errors}
                  status={errors.property}
                />
              }
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
          <ErrorMsg>{checkPassword.message || propertyEdit.message}</ErrorMsg>
          <div>
            <Button
              type="button"
              needMarginTop
              withInput
              onClick={() => navigate(`/code/property?p=${p}&d=${d}`)}
            >
              뒤로가기
            </Button>
            <Button
              type="submit"
              status="primary"
              needMarginTop
              disabled={isSubmitting}
              withInput
            >
              수정
            </Button>
          </div>
        </StyledForm>
        <Modal
          title="상품속성 수정"
          msg="상품속성 수정을 완료하였습니다."
          submitMsg="확인"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          // action={() => navigate(`/code/property`)}
        />
      </PropertyDetailBlock>
    </>
  );
};

export default PropertyDetail;
