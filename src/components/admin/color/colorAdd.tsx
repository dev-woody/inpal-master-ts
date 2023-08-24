import styled from "styled-components";
import {
  BreadCrumb,
  Description,
  DescriptionContent,
  ErrorMsg,
  Modal,
  Responsive,
} from "lib/styles";
import { Button, StyledForm, StyledInput } from "lib/styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PageHeader from "lib/pages/pageHeader";
import { useNavigate, useParams } from "react-router-dom";
import { response } from "types/globalTypes";

const ColorAddBlock = styled(Responsive)``;

type colorAddProps = {
  colorAddresult: response;
  onSubmit: (data: object) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
};

const schema = yup.object({
  rgb: yup
    .string()
    .required("RGB 코드를 입력해주세요.")
    .matches(/(#)/, "#을 포함하여 입력해주세요.")
    .length(7, "헥사코드를 6자 모두 입력해주세요."),
  name: yup.string().required("색상명을 입력해주세요."),
  kind: yup
    .string()
    .required("색상코드를 입력해주세요.")
    .matches(/(COLOR)/, "COLOR를 포함하여 입력해주세요.")
    .min(6, "컬러코드는 최소 6글자 이상입니다."),
});

const ColorAdd = ({
  colorAddresult,
  onSubmit,
  modalVisible,
  setModalVisible,
}: colorAddProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      rgb: "",
      name: "",
      kind: "",
    },
  });

  const pageInfo = JSON.parse(sessionStorage.getItem("colorPageInfo") || "{}");

  const navigate = useNavigate();
  return (
    <>
      <ColorAddBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "색상 관리 /",
                  url: `/admin/color?pageNum=${pageInfo.pageNum}&isDesc=${pageInfo.isDesc}`,
                },
                {
                  name: "색상코드 추가",
                  url: "",
                },
              ]}
            />
          }
        />
      </ColorAddBlock>
      <ColorAddBlock>
        <StyledForm
          onSubmit={handleSubmit(
            (data) => onSubmit(data),
            (errors) => console.log(errors)
          )}
        >
          <Description>
            <DescriptionContent
              span="12"
              label="헥사코드"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="헥사코드"
                  label="rgb"
                  register={register}
                  errors={errors || "#을 포함하여 입력해주세요."}
                  status={errors.rgb}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="색상이름"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="색상이름"
                  label="name"
                  register={register}
                  errors={errors}
                  status={errors.name}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="색상코드"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="색상코드"
                  label="kind"
                  register={register}
                  errors={errors}
                  status={errors.kind}
                />
              }
            />
          </Description>
          <ErrorMsg>{colorAddresult.message}</ErrorMsg>
          <div>
            <Button
              type="button"
              needMarginTop
              withInput
              onClick={() =>
                navigate(
                  `/admin/color?pageNum=${pageInfo.pageNum}&isDesc=${pageInfo.isDesc}`
                )
              }
            >
              뒤로가기
            </Button>
            <Button
              type="submit"
              status="primary"
              needMarginTop
              withInput
              disabled={isSubmitting}
            >
              색상 등록
            </Button>
          </div>
        </StyledForm>
        <Modal
          title="색상 추가"
          msg="색상 추가가 완료되었습니다."
          submitMsg="확인"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          action={() =>
            navigate(
              `/admin/color?pageNum=${pageInfo.pageNum}&isDesc=${pageInfo.isDesc}`
            )
          }
        />
      </ColorAddBlock>
    </>
  );
};

export default ColorAdd;
