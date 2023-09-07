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
import { Button, StyledForm, StyledInput } from "lib/styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PageHeader from "lib/pages/pageHeader";
import { useNavigate } from "react-router-dom";
import { response } from "types/globalTypes";

const TermsAddBlock = styled(Responsive)``;

type termsAddProps = {
  addResult: response;
  onSubmit: (data: any) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
};

const schema = yup.object({
  kind: yup.string().required("약관종류를 입력해주세요."),
  info: yup.string().required("약관내용을 입력해주세요."),
});

const TermsAdd = ({
  addResult,
  onSubmit,
  modalVisible,
  setModalVisible,
}: termsAddProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      kind: "",
      info: "",
    },
  });

  const navigate = useNavigate();

  const kindColumns = [
    {
      name: "서비스 이용약관",
      id: "SERVICE_USE_TERM",
    },
    {
      name: "개인정보처리",
      id: "PERSONAL_PRIVACY",
    },
  ];

  return (
    <>
      <TermsAddBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "약관 조회 /",
                  url: "/admin/terms",
                },
                {
                  name: "약관 등록",
                  url: "",
                },
              ]}
            />
          }
        />
      </TermsAddBlock>
      <TermsAddBlock>
        <StyledForm
          onSubmit={handleSubmit(
            (data) => onSubmit(data),
            (errors) => console.log(errors)
          )}
        >
          <Description>
            <DescriptionContent
              span="12"
              label="종류"
              content={
                <StyledSelect
                  align="vertical"
                  placeholder="약관종류선택"
                  optionList={kindColumns}
                  label="kind"
                  register={register}
                  setValue={(label: "kind", id: string) => {
                    setValue(label, id);
                  }}
                  getValues={getValues("kind")}
                  errors={errors}
                  status={errors.kind}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="약관 내용"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="약관 내용"
                  label="info"
                  fullWidth={true}
                  type="textarea"
                  register={register}
                  errors={errors}
                  status={errors.info}
                />
              }
            />
          </Description>
          <ErrorMsg>{addResult.message}</ErrorMsg>
          <Button
            type="submit"
            status="primary"
            needMarginTop
            withInput
            disabled={isSubmitting}
          >
            약관 등록
          </Button>
        </StyledForm>
        <Modal
          title="약관 추가"
          msg="약관 추가가 완료되었습니다."
          submitMsg="확인"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          action={() => navigate("/admin/terms")}
        />
      </TermsAddBlock>
    </>
  );
};

export default TermsAdd;
